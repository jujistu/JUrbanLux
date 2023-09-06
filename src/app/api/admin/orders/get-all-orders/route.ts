import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';

import { NextRequest, NextResponse } from 'next/server';
import Order from '@/modelsDB/Order';
import { JwtPayload } from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const isAuthUser = (await AuthUser(req)) as JwtPayload;

    if (isAuthUser?.role === 'admin') {
      const getAllOrders = await Order.find({}) //{} means all the orders
        .populate('orderItems.product') //from the orderModel
        .populate('user');

      if (getAllOrders) {
        return NextResponse.json({
          success: true,
          data: getAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            'failed to fetch the orders ! Please try again after some time.',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authorized !',
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
};
