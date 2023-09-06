import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';
import Cart from '@/modelsDB/Cart';
import Order from '@/modelsDB/Order';

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { user } = data;

      const saveNewOrder = await Order.create(data);

      if (saveNewOrder) {
        //deletes all the data from Cart
        await Cart.deleteMany({ userID: user });

        return NextResponse.json({
          success: true,
          message: 'Products are on the way !',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to create a order ! Please try again',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated',
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
};
