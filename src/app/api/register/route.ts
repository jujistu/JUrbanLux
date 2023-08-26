import connectToDB from '@/database/Database';
import User from '@/modelsDB/User';
import { hash } from 'bcryptjs';
import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(), //minimum of 8 charact will be required for password
  role: Joi.string().required(),
});

export const dynamic = 'force-dynamic'; //it changes dynamic behaviour of a page to fullyn static or dynamic for api routes,and it will revalidate the data being gotten

export const POST = async (req: Request) => {
  //to post registration data to our db
  await connectToDB();

  const { name, email, password, role }: RegistrationData = await req.json();
  //Validate the schema

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  //saving UserData in Db
  try {
    //check if user exists or not
    const doesUserAlreadyExists = await User.findOne({ email }); //to find by email

    if (doesUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: 'User already exists. Please try again with different email',
      });
    } else {
      const hashPassword = await hash(password, 12); //name of hash,salt length to generate

      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: 'Account created Successfully',
        });
      }
    }
  } catch (error) {
    console.log('Error while new user registration');

    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later',
    });
  }
};
