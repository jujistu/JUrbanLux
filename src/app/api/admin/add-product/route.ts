import connectToDB from '@/database/Database';
import Product from '@/modelsDB/Product';
import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';

export interface ProductData {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes: [];
  deliveryInfo: string;
  onSale: string;
  priceDrop: number;
}

export const dynamic = 'force-dynamic';

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const user = 'admin';

    if (user === 'admin') {
      const extractedData = await req.json();

      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      }: ProductData = extractedData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractedData); //create product

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: 'Product added successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to add the product! please try again',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are unauthorized to add Products',
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later',
    });
  }
};
