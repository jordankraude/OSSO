import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: Request) {
  const { paymentMethodId, amount } = await request.json(); // Get the amount from the request

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Use the amount from the request
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      // For testing, the return_url should be your success page URL
      return_url: 'http://localhost:3000/success', // Use http for local testing
    });

    return NextResponse.json({ success: true, paymentIntent });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
