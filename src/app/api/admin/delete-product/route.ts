import connectToDB from '@/database/Database';
import Product from '@/modelsDB/Product';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const DELETE = async (req: NextRequest) => {
  //Delete Data from DB
  try {
    await connectToDB();
    // const isAuthUser = await AuthUser(req);

    // if (isAuthUser?.role === "admin") {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); //id of product to be deleted

    if (!id)
      return NextResponse.json({
        success: false,
        message: 'Product ID is required',
      });

    const deletedProduct = await Product.findByIdAndDelete(id); //to delete product by id from DB

    if (deletedProduct) {
      return NextResponse.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to delete the product ! Please try again',
      });
    }
    // } else {
    //   return NextResponse.json({
    //     success: false,
    //     message: "You are not authenticated",
    //   });
    // }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later',
    });
  }
};
