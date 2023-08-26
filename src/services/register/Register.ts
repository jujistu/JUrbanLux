import { RegistrationData } from '@/app/api/register/route';

export const registerNewUser = async (formData: RegistrationData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const finalData = response.json();

    return finalData;
  } catch (error) {
    console.log('error', error);
  }
};
