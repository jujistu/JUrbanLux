'use client';

import { useRouter } from 'next/navigation';
import { ProductButton } from './ProductButton/ProductButton';
import { ProductTile } from './ProductTile/ProductTile';
import { useEffect } from 'react';
import { Notification } from '../notification/Notification';
import { ProductData } from '@/app/api/admin/add-product/route';

type CommonProductListingProps = {
  data: ProductData[];
};

export const CommonProductListing = ({ data }: CommonProductListingProps) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); //whenever we get to this page we refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='bg-white py-12 sm:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16'>
          {data && data.length
            ? data.map((item) => (
                <article
                  className='relative flex flex-col overflow-hidden border cursor-pointer'
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
};
