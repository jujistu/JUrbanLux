'use client';

import { Notification } from '@/components/notification/Notification';
import { useGlobalContext } from '@/context/Global-Context';
import { getAllOrdersForUser } from '@/services/order/Order';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Orders = () => {
  const {
    User,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useGlobalContext();

  const router = useRouter();

  const extractAllOrders = useCallback(async () => {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(User?.id!);

    if (res.success) {
      setPageLevelLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [User?.id, setPageLevelLoader, setAllOrdersForUser]);

  useEffect(() => {
    if (User !== null) extractAllOrders();
  }, [User, extractAllOrders]);

  console.log(allOrdersForUser);

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
    <section>
      <div className='mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
          <div>
            <div className='px-4 py-6 sm:px-8 sm:py-10'>
              <div className='flow-root'>
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className='flex flex-col gap-4'>
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className='bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left'
                      >
                        <div className='flex flex-col md:flex-row overflow-hidden'>
                          <h1 className='font-bold text-base md:text-lg mb-3 flex-1'>
                            #order: {item._id}
                          </h1>
                          <div className='flex items-center'>
                            <p className='mr-3 text-sm font-medium text-gray-900'>
                              Total paid amount
                            </p>
                            <p className='mr-3 text-2xl  font-semibold text-gray-900'>
                              ₦{item.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className='shrink-0'>
                              <Image
                                width={500}
                                height={500}
                                priority={true}
                                quality={95}
                                alt='Order Item'
                                className='h-24 w-24 max-w-full rounded-lg object-cover'
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className='flex gap-5'>
                          <button className='disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'>
                            {item.isProcessing
                              ? 'Order is Processing'
                              : 'Order is delivered'}
                          </button>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className=' mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
                          >
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default Orders;
