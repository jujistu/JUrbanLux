'use client';

import { registrationFormControls } from '@/utils/ConstantData';
import React, { useState } from 'react';
import SelectComponent from '@/components/FormElements/selectComponent/SelectComponent';
import InputComponent from '@/components/FormElements/inputComponents/inputComponent';
import { registerNewUser } from '@/services/register/Register';
import { RegistrationData } from '../api/register/route';
const isRegistered: boolean = false;

const initialFormData: RegistrationData = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
};

const Register = () => {
  const [formData, setFormData] = useState<RegistrationData>(initialFormData);

  const formValid = () => {
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
    const data = await registerNewUser(formData);
    console.log(formData);
    console.log(data);
  };

  return (
    <div className='bg-white relative mt-10'>
      <div className='flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row'>
        <div className='flex flex-col justify-center items-center w-full px-10 lg:flex-row'>
          <div className='w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12'>
            <div className='flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10'>
              <p className='w-full text-4xl font-medium text-center font-serif'>
                {isRegistered
                  ? 'Registration Successful'
                  : 'Sign up for an account'}
              </p>
              {isRegistered ? (
                <button className='inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'>
                  Login
                </button>
              ) : (
                <div className='w-full mt-6 mx-0 mb-0 relative space-y-8'>
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === 'input' ? (
                      <InputComponent
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
                    disabled={!formValid()}
                    className='inline-flex disabled:opacity-50 items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;