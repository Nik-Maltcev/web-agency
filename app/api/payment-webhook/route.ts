import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { setSubscriptionTier, type SubscriptionTier } from '@/lib/supabase-usage';

const MNT_ID = '50276032';
const MNT_INTEGRITY_CODE = '12345';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value.toString();
    }

    // РџСЂРѕРІРµСЂСЏРµРј РїРѕРґРїРёСЃСЊ
    const expectedSignature = crypto
      .createHash('md5')
      .update(`${data.MNT_ID}${data.MNT_TRANSACTION_ID}${data.MNT_OPERATION_ID}${data.MNT_AMOUNT}${data.MNT_CURRENCY_CODE}${data.MNT_SUBSCRIBER_ID || ''}${data.MNT_TEST_MODE}${MNT_INTEGRITY_CODE}`)
      .digest('hex');

    if (data.MNT_SIGNATURE !== expectedSignature) {
      console.error('Invalid signature');
      return new Response('FAIL', { status: 200 });
    }

    // Р›РѕРіРёСЂСѓРµРј СѓСЃРїРµС€РЅС‹Р№ РїР»Р°С‚РµР¶
    console.log('Payment received:', {
      transactionId: data.MNT_TRANSACTION_ID,
      amount: data.MNT_AMOUNT,
      operationId: data.MNT_OPERATION_ID,
      customFields: data.MNT_CUSTOM1 // plan tier
    });

    // РћРїСЂРµРґРµР»СЏРµРј С‚Р°СЂРёС„ РїРѕ СЃСѓРјРјРµ РёР»Рё custom РїРѕР»СЋ
    let tier: SubscriptionTier = 'basic';
    const amount = parseFloat(data.MNT_AMOUNT);
    
    // Р•СЃР»Рё РїРµСЂРµРґР°РЅ С‚Р°СЂРёС„ РІ custom РїРѕР»Рµ
    if (data.MNT_CUSTOM1) {
      tier = data.MNT_CUSTOM1 as SubscriptionTier;
    } else {
      // РћРїСЂРµРґРµР»СЏРµРј РїРѕ СЃСѓРјРјРµ (РЅР°СЃС‚СЂРѕР№С‚Рµ РїРѕРґ РІР°С€Рё С†РµРЅС‹)
      if (amount >= 1000) { // РџСЂРёРјРµСЂ: >= 1000 СЂСѓР± = professional
        tier = 'professional';
      } else {
        tier = 'basic';
      }
    }

    // РџРѕР»СѓС‡Р°РµРј user_id РёР· custom РїРѕР»СЏ РёР»Рё subscriber_id
    const userId = data.MNT_CUSTOM2 || data.MNT_SUBSCRIBER_ID;
    
    if (userId) {
      try {
        // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РїРѕРґРїРёСЃРєСѓ РЅР° 30 РґРЅРµР№
        await setSubscriptionTier(userId, tier, 30);
        
        console.log('Subscription activated:', {
          userId,
          tier,
          transactionId: data.MNT_TRANSACTION_ID
        });
      } catch (error) {
        console.error('Error setting subscription:', error);
        // РџСЂРѕРґРѕР»Р¶Р°РµРј, С‡С‚РѕР±С‹ РІРµСЂРЅСѓС‚СЊ SUCCESS РґР»СЏ PayAnyWay
      }
    } else {
      console.warn('No user ID provided in payment data');
    }

    return new Response('SUCCESS', { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('FAIL', { status: 200 });
  }
}

export async function GET() {
  return new Response('SUCCESS', { status: 200 });
}