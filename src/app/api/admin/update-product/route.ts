import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';
import Product from '@/modelsDB/Product';
import { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const PUT = async (req: NextRequest) => {
  //to update Product we use PUT request
  try {
    await connectToDB();

    const isAuthUser = (await AuthUser(req)) as JwtPayload;

    if (isAuthUser?.role === 'admin') {
      const extractedData = await req.json();
      console.log(extractedData);
      const {
        _id,
        name,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractedData;

      const updatedProduct = await Product.findOneAndUpdate(
        //to find a product from db and update by _id
        {
          _id: _id,
        },
        {
          name,
          price,
          description,
          category,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        { new: true }
      );

      if (updatedProduct) {
        return NextResponse.json({
          success: true,
          message: 'Product updated successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to update the product ! Please try again later',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated',
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
