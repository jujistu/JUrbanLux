import connectToDB from '@/database/Database';
import User from '@/modelsDB/User';
import { compare } from 'bcryptjs';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface LoginData {
  email: string;
  password: any;
}

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  await connectToDB();

  const { email, password }: LoginData = await req.json();

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    const checkUser = await User.findOne({ email }); //check if email exists

    if (!checkUser) {
      return NextResponse.json({
        success: false,
        message: 'Account not found with this email',
      });
    }

    const checkPassword = await compare(password, checkUser.password); //compare passwords

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: 'Incorrect password. Please try again',
      });
    }

    const token = jwt.sign(
      //to get token for auth
      {
        id: checkUser._id,
        email: checkUser?.email,
        role: checkUser?.role,
      },
      process.env.default_secret_key!,
      { expiresIn: '1d' }
    );

    const finalData = {
      token,
      user: {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role,
        name: checkUser.name,
      },
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      finalData,
    });
  } catch (error) {
    console.log('Error while Logging In. Please try again');

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later',
    });
  }
};
