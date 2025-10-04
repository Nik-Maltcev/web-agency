import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerSupabaseClient } from '@/lib/supabase';

const MNT_ID = '50276032';
const MNT_INTEGRITY_CODE = '12345';

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();
    
    if (!plan || !['basic', 'professional'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Получаем текущего пользователя
    const client = createServerSupabaseClient();
    const { data: { user }, error: authError } = await client.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const amount = plan === 'basic' ? '299.00' : '499.00';
    const description = plan === 'basic' ? 'Базовый тариф (5 запросов)' : 'Профессиональный тариф (15 запросов)';
    const transactionId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Формируем подпись
    const signature = crypto
      .createHash('md5')
      .update(`${MNT_ID}${transactionId}${amount}RUB0${MNT_INTEGRITY_CODE}`)
      .digest('hex');

    const paymentUrl = plan === 'basic' 
      ? 'https://self.payanyway.ru/17591641945716'
      : 'https://self.payanyway.ru/17591644240597';

    return NextResponse.json({
      success: true,
      paymentUrl,
      paymentData: {
        MNT_ID,
        MNT_TRANSACTION_ID: transactionId,
        MNT_AMOUNT: amount,
        MNT_CURRENCY_CODE: 'RUB',
        MNT_TEST_MODE: '0',
        MNT_DESCRIPTION: description,
        MNT_SIGNATURE: signature,
        MNT_CUSTOM1: plan, // Передаем тариф
        MNT_CUSTOM2: user.id // Передаем user_id для активации подписки
      }
    });

  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
  }
}