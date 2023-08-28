import { LoginData } from '@/app/api/login/route';

export const login = async (formData: LoginData) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('error', error);
  }
};
