'use client';
import { ProductData } from '@/app/api/admin/add-product/route';
import { ComponentLevelLoader } from '@/components/Loader/componentLevelLoader/ComponentLevelLoader';

import { useGlobalContext } from '@/context/Global-Context';
// import { addToCart } from '@/services/cart';
// import { deleteAProduct } from '@/services/product';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type ProductButtonProps = {
  item: ProductData;
};

export const ProductButton = ({ item }: ProductButtonProps) => {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    User,
    // showCartModal,
    // setShowCartModal,
  } = useGlobalContext();
  const router = useRouter();

  const isAdminView = pathName.includes('admin-view');

  async function handleDeleteProduct(item) {
    //   setComponentLevelLoader({ loading: true, id: item._id });
    //   const res = await deleteAProduct(item._id);
    //   if (res.success) {
    //     setComponentLevelLoader({ loading: false, id: '' });
    //     toast.success(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     router.refresh();
    //   } else {
    //     toast.error(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     setComponentLevelLoader({ loading: false, id: '' });
    //   }
  }

  async function handleAddToCart(getItem) {
    //   setComponentLevelLoader({ loading: true, id: getItem._id });
    //   const res = await addToCart({ productID: getItem._id, userID: user._id });
    //   if (res.success) {
    //     toast.success(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     setComponentLevelLoader({ loading: false, id: '' });
    //     setShowCartModal(true);
    //   } else {
    //     toast.error(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     setComponentLevelLoader({ loading: false, id: '' });
    //     setShowCartModal(true);
    //   }
    //   console.log(res);
  }

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item); //item is Product data
          router.push('/admin-view/add-product');
        }}
        className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
      >
        Update
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={'Deleting Product'}
            color={'#ffffff'}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          'DELETE'
        )}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleAddToCart(item)}
        className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={'Adding to cart'}
            color={'#ffffff'}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          'Add To Cart'
        )}
      </button>
    </>
  );
};
