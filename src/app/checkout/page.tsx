'use client';

import {
  initialCheckoutData,
  useGlobalContext,
} from '@/context/Global-Context';
import { fetchAllAddresses } from '@/services/address/Address';

import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { AddressProp } from '../api/address/add-new-address/route';
import { Notification } from '@/components/notification/Notification';
import { callStripeSession } from '@/services/stripe/Stripe';
import { AfterPayOrderData, createNewOrder } from '@/services/order/Order';

const Checkout = () => {
  const {
    cartItem,
    User,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useGlobalContext();

  const [selectedAddress, setSelectedAddress] = useState<
    AddressProp | null | string
  >(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const params = useSearchParams(); //to search the Url after successful for the status query

  const publishableKey =
    'pk_test_51Nmg2YBtZibhvdEGLkb5A1m4OXQ2su5SVu1Fkbjcjn6YiKlJ4NXAnMPP2slkUveZ8Kgh5AQxErVELCmmSZkOhoZ800bnlxrWH3';

  const stripePromise = loadStripe(publishableKey);

  console.log(cartItem);

  const getAllAddresses = useCallback(async () => {
    if (User?.id !== undefined) {
      const res = await fetchAllAddresses(User?.id);

      if (res.success) {
        setAddresses(res.data); //sets it to the total address in Array
      }
    }
  }, [User?.id, setAddresses]);

  useEffect(() => {
    if (User !== null) getAllAddresses();
  }, [User, getAllAddresses]);

  //if payment successful
  useEffect(() => {
    const createFinalOrder = async () => {
      const isStripe = JSON.parse(localStorage.getItem('stripe')!) as boolean;

      if (
        isStripe &&
        params.get('status') === 'success' &&
        cartItem &&
        cartItem.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem('checkoutFormData')!
        );

        const createFinalCheckoutFormData: AfterPayOrderData = {
          user: User?.id!,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItem.map((item) => ({
            qty: 1,
            product: item.productID,
          })),
          paymentMethod: 'Stripe',
          totalPrice: cartItem.reduce(
            (total, item) => item.productID.price + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        //to get create new order in structure of orders Schema
        const res = await createNewOrder(createFinalCheckoutFormData);

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };

    createFinalOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User?.id, cartItem, params.get('status')]);

  const handleSelectedAddress = (getAddress: AddressProp) => {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData(initialCheckoutData);

      return;
    }

    // if (getAddress._id !== null && getAddress._id !== undefined) {
    setSelectedAddress(getAddress?._id as string);
    // }

    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  };

  //comparing initialCheckout with
  const hasNonEmptyValue = Object.values(
    checkoutFormData.shippingAddress!
  ).some((value) => value.trim() !== '');

  console.log(hasNonEmptyValue);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    //line Item is required in stripeApi route as req
    const createLineItems = cartItem.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    //to process Order
    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem('stripe', true.toString());
    localStorage.setItem('checkoutFormData', JSON.stringify(checkoutFormData));

    if (stripe !== null) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: res.id, //id received from api route
      });
      console.log(error);
    }
  };

  // console.log(checkoutFormData);

  //redirect to the orders page
  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        setOrderSuccess(false);
        router.push('/orders');
      }, 4000);
    }
  }, [orderSuccess, router]);

  if (orderSuccess) {
    return (
      <section className='h-screen bg-gray-200'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 '>
            <div className='bg-white shadow'>
              <div className='px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5'>
                <h1 className='font-bold text-lg'>
                  Your payment is successful and you will be redirected to
                  orders page in few seconds !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <PulseLoader
          color={'#000000'}
          loading={isOrderProcessing}
          size={30}
          data-testid='loader'
        />
      </div>
    );
  }

  return (
    <div>
      <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
        <div className='px-4 pt-8'>
          <p className='font-medium text-xl'>Cart Summary</p>
          <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5'>
            {cartItem && cartItem.length ? (
              cartItem.map((item) => (
                <div
                  className='flex flex-col rounded-lg bg-white sm:flex-row'
                  key={item._id}
                >
                  <Image
                    width={500}
                    height={500}
                    priority={true}
                    quality={95}
                    src={item && item.productID && item.productID.imageUrl}
                    alt='Cart Item'
                    className='m-2 h-24 w-28 rounded-md border object-cover object-center'
                  />
                  <div className='flex w-full flex-col px-4 py-4'>
                    <span className='font-bold'>
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className='font-semibold'>
                      {item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
        </div>
        <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
          <p className='text-xl font-medium'>Shipping address details</p>
          <p className='text-gray-400 font-bold'>
            Complete your order by selecting address below
          </p>
          <div className='w-full mt-6 mx-0 mb-0 space-y-6'>
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-6 ${
                    item._id === selectedAddress ? 'border-red-900' : ''
                  }`}
                >
                  <p>Name : {item.fullName}</p>
                  <p>Address : {item.address}</p>
                  <p>City : {item.city}</p>
                  <p>Country : {item.country}</p>
                  <p>PostalCode : {item.postalCode}</p>
                  <button className='mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'>
                    {item._id === selectedAddress
                      ? 'Selected Address'
                      : 'Select Address'}
                  </button>
                </div>
              ))
            ) : (
              <p>No addresses added</p>
            )}
          </div>
          <button
            onClick={() => router.push('/account')}
            className='mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
          >
            Add new address
          </button>
          <div className='mt-6 border-t border-b py-2'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-900'>Subtotal</p>
              <p className='text-lg font-bold text-gray-900'>
                $
                {cartItem && cartItem.length
                  ? cartItem.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : '0'}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-900'>Shipping</p>
              <p className='text-lg font-bold text-gray-900'>Free</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-900'>Total</p>
              <p className='text-lg font-bold text-gray-900'>
                $
                {cartItem && cartItem.length
                  ? cartItem.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : '0'}
              </p>
            </div>
            <div className='pb-10'>
              <button
                disabled={
                  (cartItem && cartItem.length === 0) || !hasNonEmptyValue
                }
                onClick={handleCheckout}
                className='disabled:opacity-50 mt-5 mr-5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Checkout;
