'use client';

import { ProductData } from '@/app/api/admin/add-product/route';
import InputComponent from '@/components/FormElements/inputComponents/inputComponent';
import SelectComponent from '@/components/FormElements/selectComponent/SelectComponent';
import { TileComponent } from '@/components/FormElements/tileComponent/TileComponent';
import { ComponentLevelLoader } from '@/components/Loader/componentLevelLoader/ComponentLevelLoader';
import { Notification } from '@/components/notification/Notification';
import { useGlobalContext } from '@/context/Global-Context';
import { addNewProduct, updatedProduct } from '@/services/product/Product';
import {
  AvailableSizes,
  adminAddProductformControls,
} from '@/utils/ConstantData';
import { firebaseConfig, firebaseStorageURL } from '@/utils/Firebase';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//FIREBASE IMAGE STORAGE SET-UP
const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile: any) => {
  const timeStamp = Date.now();

  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

const helperForUploadingImageToFirebase = async (file: any) => {
  //to get firebaseUrl for mongoDb
  const getFileName = createUniqueFileName(file);

  const storageReference = ref(storage, `juExpress/${getFileName}`);

  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .then((error) => reject(error));
      } //onComplete
    );
  });
};

//----page & formdata--------

const initialFormData: ProductData = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  category: 'men',
  sizes: [],
  deliveryInfo: '',
  onSale: 'no',
  priceDrop: 0,
};

const AdminAddNewProduct = () => {
  const router = useRouter();

  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useGlobalContext();

  const [formData, setFormData] = useState<ProductData>(initialFormData);

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct); //after setting the updated product in the update button it takes us here and set the Product as formData
  }, [currentUpdatedProduct]);

  //Image Upload handler
  const handleImage = async (event: any) => {
    console.log(event.target.files);

    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );

    console.log(extractImageUrl);
    if (extractImageUrl !== '') {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl as string,
      });
    }
  };

  //Handle Sizes selection
  const handleTileClick = (getCurrentItem: (typeof AvailableSizes)[number]) => {
    console.log(getCurrentItem);

    let selectedSizes: (typeof AvailableSizes)[number][] = [...formData.sizes];

    const index = selectedSizes.findIndex(
      (item: any) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      //if it doesnt exist,there's no value in the sizes array
      selectedSizes.push(getCurrentItem);
    } else {
      selectedSizes = selectedSizes.filter(
        (item) => item.id !== getCurrentItem.id
      );
    }
    setFormData({
      ...formData,
      sizes: selectedSizes as [],
    });
  };
  console.log(formData);

  //Handle Add Product to mongoDB
  const handleAddProduct = async () => {
    setComponentLevelLoader({ loading: true, id: '' });

    const response =
      currentUpdatedProduct !== null
        ? await updatedProduct(formData)
        : await addNewProduct(formData);

    if (response.success) {
      setComponentLevelLoader({ loading: false, id: '' });
      toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

      setFormData(initialFormData);
      setTimeout(() => {
        //navigate if successful
        router.push('/admin-view/all-products');
      }, 1000);
    } else {
      setComponentLevelLoader({ loading: false, id: '' });
      toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });

      setFormData(initialFormData);
    }
  };

  return (
    <div className='w-full mt-5 mx-0 mb-0 relative'>
      <div className='flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative'>
        <div className='w-full mt-6 mx-0 mb-0 space-y-8'>
          <div className='ml-5 my-0'>
            <input
              accept='image/*'
              max={1000000}
              type='file'
              onChange={handleImage}
            />
          </div>
          <div className='flex gap-y-2 px-4 flex-col'>
            <label>Available sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === 'input' ? (
              <InputComponent
                key={controlItem.id}
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === 'select' ? (
              <SelectComponent
                key={controlItem.id}
                label={controlItem.label}
                options={controlItem.options as any}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : null
          )}
          <button
            onClick={handleAddProduct}
            className='inline-flex items-center justify-center bg-black px-6 py-4 text-lg text-white rounded-xl font-medium uppercase tracking-wide'
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text='Adding Product'
                color='#ffffff'
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
