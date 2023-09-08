import { ProductData } from '@/app/api/admin/add-product/route';
import { cartItemProp } from '@/context/Global-Context';
import Cookies from 'js-cookie';

//add Cart items
export const addToCart = async (formData: cartItemProp) => {
  try {
    const response = await fetch('/api/cart/add-to-cart', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
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

//get All cart items
export const getAllCartItems = async (id: string) => {
  try {
    const res = await fetch(
      `https://jurbanlux.vercel.app/api/cart/all-cart-items?id=${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );

    const data = await res.json();
    console.log(data);

    return data;
  } catch (e) {
    console.log(e);
  }
};

//delete from Cart
export const deleteFromCart = async (id: string) => {
  try {
    const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
