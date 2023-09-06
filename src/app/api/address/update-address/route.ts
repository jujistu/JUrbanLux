import connectToDB from '@/database/Database';
import AuthUser from '@/middleware/AuthUser';
import Address from '@/modelsDB/Address';

import { NextRequest, NextResponse } from 'next/server';
import { AddressProp } from '../add-new-address/route';

export const dynamic = 'force-dynamic';

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { _id, fullName, city, address, country, postalCode }: AddressProp =
        data;

      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, city, address, country, postalCode },
        { new: true }
      );

      if (updateAddress) {
        return NextResponse.json({
          success: true,
          message: 'Address updated successfully!',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'failed to update address ! Please try again',
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
