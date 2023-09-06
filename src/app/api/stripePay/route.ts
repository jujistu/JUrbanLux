import AuthUser from '@/middleware/AuthUser';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.stripeKey!);

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        //create session
        payment_method_types: ['card'],
        line_items: res,
        mode: 'payment',
        success_url: 'http://localhost:3000/checkout' + '?status=success',
        cancel_url: 'http://localhost:3000/checkout' + '?status=cancel',
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'You are not authenticated',
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Something went wrong ! Please try again',
    });
  }
};
