import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';
import Cart from '@/modelsDB/Cart';

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');

      if (!id)
        return NextResponse.json({
          success: false,
          message: 'Cart Item ID is required',
        });

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: 'Cart Item deleted successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to delete Cart item ! Please try again.',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated',
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again',
    });
  }
};
