import { AddressProp } from '@/app/api/address/add-new-address/route';
import { ProductData } from '@/app/api/admin/add-product/route';
import Cookies from 'js-cookie';
import { User } from '@/context/Global-Context';

export type AfterPayOrderData = {
  _id?: string;
  user: User | string;
  shippingAddress: AddressProp;
  orderItems: {
    qty: number;
    product: ProductData;
    _id?: string;
  }[];
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isProcessing: boolean;
  paidAt: Date;
  createdAt?: string;
};

//create new order
export const createNewOrder = async (formData: AfterPayOrderData) => {
  try {
    const res = await fetch('/api/order/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

//get all user order
export const getAllOrdersForUser = async (id: string) => {
  try {
    const res = await fetch(`/api/order/get-all-orders?id=${id}`, {
      method: 'GET',
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

//get order Details using Products ID
export const getOrderDetails = async (id: string | string[]) => {
  try {
    const res = await fetch(`/api/order/order-details?id=${id}`, {
      method: 'GET',
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

//for admin all Orders
export const getAllOrdersForAllUsers = async () => {
  try {
    const res = await fetch(`/api/admin/orders/get-all-orders`, {
      method: 'GET',
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

export const updateStatusOfOrder = async (formData: AfterPayOrderData) => {
  try {
    const res = await fetch(`/api/admin/orders/update-order`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
