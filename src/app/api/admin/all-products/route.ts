import connectToDB from '@/database/Database';
import Product from '@/modelsDB/Product';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectToDB();

    const user = 'admin';

    if (user === 'admin') {
      const extractAllProducts = await Product.find({}); //to find the products in the DB
      console.log(extractAllProducts);
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
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are unauthorized',
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
