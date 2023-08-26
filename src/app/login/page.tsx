'use client';

import InputComponent from '@/components/FormElements/inputComponents/inputComponent';

import { loginFormControls } from '@/utils/ConstantData';
import { useRouter } from 'next/navigation';
import React from 'react';

const Login = () => {
  const router = useRouter(); //for navigation on button tag onClick

  return (
    <div className='bg-white relative mt-10'>
      <div className='flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row'>
        <div className='flex flex-col justify-center items-center w-full px-10 lg:flex-row'>
          <div className='w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12'>
            <div className='flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10'>
              <p className='w-full text-4xl font-medium text-center font-serif tracking-wide'>
                Login
              </p>

              <div className='w-full mt-6 mx-0 mb-0 relative space-y-8'>
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === 'input' ? (
                    <InputComponent
                      key={controlItem.id}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                    />
                  ) : null
                )}
                <button className='inline-flex  items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'>
                  Login
                </button>
                <div className='flex flex-col gap-2'>
                  <p>New to website ?</p>
                  <button
                    onClick={() => router.push('/register')}
                    className='inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
