import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';
import Order from '@/modelsDB/Order';

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');

      const extractAllOrders = await Order.find({ user: id }).populate(
        'orderItems.product' //this from our orders model structure
      );

      if (extractAllOrders) {
        return NextResponse.json({
          success: true,
          data: extractAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to get all orders ! Please try again',
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
