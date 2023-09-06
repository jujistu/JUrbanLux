import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';
import Cart from '@/modelsDB/Cart';

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');

      //must be authenticated
      if (!id)
        return NextResponse.json({
          success: false,
          message: 'Please login in!',
        });

      const extractAllCartItems = await Cart.find({ userID: id }).populate(
        'productID'
      );

      if (extractAllCartItems) {
        return NextResponse.json({ success: true, data: extractAllCartItems });
      } else {
        return NextResponse.json({
          success: false,
          message: 'No Cart items are found !',
          status: 204,
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
      message: 'Something went wrong ! Please try again',
    });
  }
};
