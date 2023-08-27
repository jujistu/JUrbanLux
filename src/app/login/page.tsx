'use client';

import InputComponent from '@/components/FormElements/inputComponents/inputComponent';

import { loginFormControls } from '@/utils/ConstantData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { LoginData } from '../api/login/route';
import { login } from '@/services/login/Login';
import { useGlobalContext } from '@/context/Global-Context';
import Cookies from 'js-cookie';
import { ComponentLevelLoader } from '@/components/Loader/componentLevelLoader/ComponentLevelLoader';
import { Notification } from '@/components/notification/Notification';
import { toast } from 'react-toastify';

const initialFormData: LoginData = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);

  const {
    isAuthUser,
    setIsAuthUser,
    User,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useGlobalContext();

  const router = useRouter(); //for navigation on button tag onClick

  const isFormValid = () => {
    return formData &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
      ? true
      : false;
  };

  const handleLoginSubmit = async () => {
    setComponentLevelLoader({ loading: true, id: '' });
    const response = await login(formData);
    console.log(response);
    if (response.success) {
      //success is from the finalData returned in the login router
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(response?.finalData?.user); //setUser to the user object
      setFormData(initialFormData);
      Cookies.set('token', response?.finalData?.token); //store token from loggedIn user
      localStorage.setItem('user', JSON.stringify(response?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: '' });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: '' });
    }
  };

  useEffect(() => {
    if (isAuthUser) router.push('/');
  }, [isAuthUser, router]);

  return (
    <div className='bg-white relative'>
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
                      autoComplete={controlItem.type}
                      key={controlItem.id}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : null
                )}
                <button
                  disabled={!isFormValid()}
                  className='inline-flex disabled:opacity-50  items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'
                  onClick={handleLoginSubmit}
                >
                  {isFormValid() &&
                  componentLevelLoader &&
                  componentLevelLoader?.loading ? (
                    <ComponentLevelLoader
                      text='Logging In'
                      color='#ffffff'
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    'Login'
                  )}
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
      <Notification />
    </div>
  );
};

export default Login;
