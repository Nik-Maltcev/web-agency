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

    // Проверяем подпись
    const expectedSignature = crypto
      .createHash('md5')
      .update(`${data.MNT_ID}${data.MNT_TRANSACTION_ID}${data.MNT_OPERATION_ID}${data.MNT_AMOUNT}${data.MNT_CURRENCY_CODE}${data.MNT_SUBSCRIBER_ID || ''}${data.MNT_TEST_MODE}${MNT_INTEGRITY_CODE}`)
      .digest('hex');

    if (data.MNT_SIGNATURE !== expectedSignature) {
      console.error('Invalid signature');
      return new Response('FAIL', { status: 200 });
    }

    // Логируем успешный платеж
    console.log('Payment received:', {
      transactionId: data.MNT_TRANSACTION_ID,
      amount: data.MNT_AMOUNT,
      operationId: data.MNT_OPERATION_ID,
      customFields: data.MNT_CUSTOM1 // plan tier
    });

    // Определяем тариф по сумме или custom полю
    let tier: SubscriptionTier = 'basic';
    const amount = parseFloat(data.MNT_AMOUNT);
    
    // Если передан тариф в custom поле
    if (data.MNT_CUSTOM1) {
      tier = data.MNT_CUSTOM1 as SubscriptionTier;
    } else {
      // Определяем по сумме (настройте под ваши цены)
      if (amount >= 1000) { // Пример: >= 1000 руб = professional
        tier = 'professional';
      } else {
        tier = 'basic';
      }
    }

    // Получаем user_id из custom поля или subscriber_id
    const userId = data.MNT_CUSTOM2 || data.MNT_SUBSCRIBER_ID;
    
    if (userId) {
      try {
        // Устанавливаем подписку на 30 дней
        await setSubscriptionTier(userId, tier, 30);
        
        console.log('Subscription activated:', {
          userId,
          tier,
          transactionId: data.MNT_TRANSACTION_ID
        });
      } catch (error) {
        console.error('Error setting subscription:', error);
        // Продолжаем, чтобы вернуть SUCCESS для PayAnyWay
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