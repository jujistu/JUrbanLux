import connectToDB from '@/database/Database';
import Product from '@/modelsDB/Product';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    const gotData = await Product.find({ category: id }); //to get product by category using id

    if (gotData) {
      return NextResponse.json({
        success: true,
        data: gotData,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No Products found !',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
};
