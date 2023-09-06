import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';
import Address from '@/modelsDB/Address';

import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';

export interface AddressProp {
  _id?: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  userID?: string;
}

const AddNewAddress = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userID: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();

      const {
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      }: AddressProp = data;

      const { error } = AddNewAddress.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyAddedAddress = await Address.create(data);

      if (newlyAddedAddress) {
        return NextResponse.json({
          success: true,
          message: 'Address added successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'failed to add an address ! Please try again later',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated',
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
