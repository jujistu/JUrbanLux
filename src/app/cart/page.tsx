'use client';

import { CartDetails } from '@/components/CartDetails/CartDetails';
import { Notification } from '@/components/notification/Notification';
import { cartItemProp, useGlobalContext } from '@/context/Global-Context';
import { deleteFromCart, getAllCartItems } from '@/services/cart/Cart';
import { useCallback, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    User,
    setCartItem,
    cartItem,
    pageLevelLoader,
    setPageLevelLoader,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useGlobalContext();

  const extractAllCartItems = useCallback(async () => {
    setPageLevelLoader(true);
    const res = await getAllCartItems(User?.id!);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item: cartItemProp) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === 'yes'
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItem(updatedData);
      setPageLevelLoader(false);
      localStorage.setItem('cartItems', JSON.stringify(updatedData));
    }

    console.log(res);
  }, [User?.id, setCartItem, setPageLevelLoader]);

  useEffect(() => {
    if (User !== null) extractAllCartItems();
  }, [User, extractAllCartItems]); //will only run when extractAllitem changes than on every render

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
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  };

  if (pageLevelLoader) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <PulseLoader
          color={'#000000'}
          loading={pageLevelLoader}
          size={30}
          data-testid='loader'
        />
      </div>
    );
  }
  return (
    <>
      <CartDetails
        cartItems={cartItem}
        handleDeleteCartItem={handleDeleteCartItem}
        componentLevelLoader={componentLevelLoader}
      />
      <Notification />
    </>
  );
};

export default Cart;
