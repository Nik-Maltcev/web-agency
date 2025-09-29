import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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
      operationId: data.MNT_OPERATION_ID
    });

    // Здесь можно добавить логику сохранения в БД
    // await savePayment(data);

    return new Response('SUCCESS', { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('FAIL', { status: 200 });
  }
}

export async function GET() {
  return new Response('SUCCESS', { status: 200 });
}