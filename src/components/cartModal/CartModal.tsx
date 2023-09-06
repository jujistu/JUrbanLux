'use client';

import React, { Fragment, useEffect } from 'react';
import CommonModal from '../commonModal/CommonModal';
import { useGlobalContext } from '@/context/Global-Context';
import { deleteFromCart, getAllCartItems } from '@/services/cart/Cart';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ComponentLevelLoader } from '../Loader/componentLevelLoader/ComponentLevelLoader';
import { useRouter } from 'next/navigation';

export const CartModal = () => {
  const router = useRouter();

  const {
    showCartModal,
    setShowCartModal,
    User,
    cartItem,
    setCartItem,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useGlobalContext();

  const extractAllCartItems = async () => {
    const res = await getAllCartItems(User?.id!);
    if (res.success) {
      setCartItem(res.data);
      localStorage.setItem('cartItems', JSON.stringify(res.data));
    }

    console.log(res);
  };

  //only happen when a user is authenticated
  useEffect(() => {
    if (User !== null) extractAllCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User]);

  //delete CartItem
  const handleDeleteCartItem = async (getCartItemID: string) => {
    setComponentLevelLoader({ loading: true, id: getCartItemID });

    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      setComponentLevelLoader({ loading: false, id: getCartItemID });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <CommonModal
      show={showCartModal}
      setShow={setShowCartModal}
      showButtons={true}
      mainContent={
        cartItem && cartItem.length ? (
          <ul role='list' className='mt-15 md:-my-6 divide-y divide-gray-300'>
            {cartItem.map((cartItem) => (
              <li key={cartItem._id} className='flex pt-7 pb-6 md:py-6'>
                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                  <Image
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt='Product Image'
                    width={500}
                    height={500}
                    quality={95}
                    priority={true}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <div className='ml-4 flex flex-1 flex-col'>
                  <div>
                    <div className='flex justify-between text-base font-medium text-gray-900'>
                      <h3>
                        <a href={`/product/${cartItem.productID._id}`}>
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.name}
                        </a>
                      </h3>
                    </div>
                    <p className='mt-1 text-sm text-gray-600'>
                      {cartItem &&
                        cartItem.productID &&
                        cartItem.productID.price}
                    </p>
                  </div>
                  <div className='flex flex-1 items-end justify-between text-sm'>
                    <button
                      onClick={() => handleDeleteCartItem(cartItem._id!)}
                      className='font-medium text-yellow-600 sm:order-2'
                      type='button'
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === cartItem._id ? (
                        <ComponentLevelLoader
                          color='#000000'
                          text='Removing'
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        'Remove'
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            onClick={() => {
              router.push('/cart');
              setShowCartModal(false);
            }}
            type='button'
            className='mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
          >
            Go to Cart
          </button>
          <button
            disabled={cartItem && cartItem.length === 0}
            onClick={() => {
              router.push('/checkout');
              setShowCartModal(false);
            }}
            type='button'
            className='disabled:opacity-50 mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
          >
            Checkout
          </button>
          <div className='mt-6 flex justify-center text-center text-sm text-gray-600'>
            <button
              onClick={() => {
                router.push('/product/listing/all-products');
                setShowCartModal(false);
              }}
              type='button'
              className='font-medium text-grey'
            >
              Continue Shopping
              <span aria-hidden='true' className='ml-0.5'>
                &rarr;
              </span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
};
