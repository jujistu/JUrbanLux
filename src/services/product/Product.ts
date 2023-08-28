import Cookies from 'js-cookie';
import { ProductData } from '@/app/api/admin/add-product/route';

//add new product service

export const addNewProduct = async (formData: ProductData) => {
  try {
    const response = await fetch('/api/admin/add-product', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`, //token give to the user on login stored in cookies
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//get the adminProducts from DB
export const getAllAdminProducts = async () => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/admin/all-products',
      {
        method: 'GET',
        cache: 'no-store', //this to allow it to fetch all and new data
      }
    ); //when performing GET request we pass the absolute/full URL

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//Update Product to DB by _id (PUT)
export const updatedProduct = async (formData: ProductData) => {
  try {
    const response = await fetch('/api/admin/update-product', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//Delete Product by id
export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
