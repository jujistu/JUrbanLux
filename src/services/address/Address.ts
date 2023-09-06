import { AddressProp } from '@/app/api/address/add-new-address/route';
import Cookies from 'js-cookie';

export const addNewAddress = async (formData: AddressProp) => {
  try {
    const response = await fetch('/api/address/add-new-address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAllAddresses = async (id: string) => {
  try {
    const response = await fetch(`/api/address/get-all-address?id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateAddress = async (formData: AddressProp) => {
  try {
    const response = await fetch('/api/address/update-address', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const response = await fetch(`/api/address/delete-address?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
