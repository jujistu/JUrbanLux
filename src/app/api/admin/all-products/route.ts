import connectToDB from '@/database/Database';
import Product from '@/modelsDB/Product';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectToDB();

    const extractAllProducts = await Product.find({}); //to find the products in the DB

    if (extractAllProducts) {
      return NextResponse.json({
        success: true,
        data: extractAllProducts,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No Products Found',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again',
    });
  }
};
