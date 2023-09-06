import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const AuthUser = async (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.split(' ')[1]; //Authorization from the headers in apicall services file

  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(
      token,
      process.env.default_secret_key!
    ); //to verify if the token is auth
    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthUser;
