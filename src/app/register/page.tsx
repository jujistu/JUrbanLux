'use client';

import { registrationFormControls } from '@/utils/ConstantData';
import React, { useEffect, useState } from 'react';
import SelectComponent from '@/components/FormElements/selectComponent/SelectComponent';
import InputComponent from '@/components/FormElements/inputComponents/inputComponent';
import { registerNewUser } from '@/services/register/Register';
import { RegistrationData } from '../api/register/route';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/Global-Context';
import { useRouter } from 'next/navigation';
import { ComponentLevelLoader } from '@/components/Loader/componentLevelLoader/ComponentLevelLoader';
import { Notification } from '@/components/notification/Notification';

const initialFormData: RegistrationData = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
};

const Register = () => {
  const [formData, setFormData] = useState<RegistrationData>(initialFormData);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const { setPageLevelLoader, pageLevelLoader, isAuthUser } =
    useGlobalContext();

  const router = useRouter();

  const isFormValid = () => {
    return formData &&
      formData.name &&
      formData.name.trim() !== '' &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
      ? true
      : false;
  };

  const handleRegisterSubmit = async () => {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }
  };

  useEffect(() => {
    if (isAuthUser) router.push('/');
    setPageLevelLoader(false);
  }, [isAuthUser, router, setPageLevelLoader]);

  return (
    <div className='bg-white relative'>
      <div className='flex flex-col items-center justify-between py-0 px-5 mt-8 mr-auto xl:px-5 lg:flex-row'>
        <div className='flex flex-col justify-center items-center px-2 w-full md:px-10 lg:flex-row'>
          <div className='w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12'>
            <div className='flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10'>
              <p className='w-full text-3xl md:text-4xl font-medium text-center font-serif'>
                {isRegistered
                  ? 'Registration Successful'
                  : 'Sign up for an account'}
              </p>
              {isRegistered ? (
                <button
                  onClick={() => router.push('/login')}
                  className='inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'
                >
                  Login
                </button>
              ) : (
                <div className='w-full mt-6 mx-0 mb-0 relative space-y-8'>
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === 'input' ? (
                      <InputComponent
                        autoComplete={controlItem.type}
                        key={controlItem.id}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          })
                        }
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === 'select' ? (
                      <SelectComponent
                        key={controlItem.id}
                        options={controlItem.options as any}
                        label={controlItem.label}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          })
                        }
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <button
                    onClick={handleRegisterSubmit}
                    disabled={!isFormValid()}
                    className='inline-flex rounded-xl disabled:opacity-50 items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'
                  >
                    {pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={'Registering'}
                        color={'#ffffff'}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Register;
