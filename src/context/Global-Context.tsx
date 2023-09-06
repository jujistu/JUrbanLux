'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ProductData } from '@/app/api/admin/add-product/route';
import { AddressProp } from '@/app/api/address/add-new-address/route';
import { usePathname, useRouter } from 'next/navigation';
import { AfterPayOrderData } from '@/services/order/Order';

export interface componentLoader {
  loading: boolean;
  id: string;
}

export type OrderData = {
  _id?: string;
  user: {
    email: string;
    role: string;
    _id: string;
    name: string;
  };
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

export interface cartItemProp {
  createdAt?: string;
  productID: ProductData;
  quantity?: number;
  updatedAt?: string;
  userID?: string;
  __v?: number;
  _id?: string;
}

export const initialAddressObject: AddressProp = {
  fullName: '',
  city: '',
  country: '',
  postalCode: '',
  address: '',
};

export type CheckoutData = {
  shippingAddress?: AddressProp;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isProcessing: boolean;
};

export const initialCheckoutData: CheckoutData = {
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  },
  paymentMethod: '',
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

export type AfterPayOrderDataArray = AfterPayOrderData[];

export type AddressesArray = AddressProp[];

export type cartItemArray = cartItemProp[];

//for only authenticated Users
const protectedRoutes = ['cart', 'checkout', 'account', 'orders', 'admin-view'];

//for only Admins
const protectedAdminRoutes = [
  '/admin-view',
  '/admin-view/add-product',
  '/admin-view/all-products',
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

type GlobalContextType = {
  componentLevelLoader: componentLoader;
  setComponentLevelLoader: React.Dispatch<
    React.SetStateAction<componentLoader>
  >;
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  pageLevelLoader: boolean;
  setPageLevelLoader: React.Dispatch<React.SetStateAction<boolean>>;
  User: User | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  isAuthUser: boolean | null;
  currentUpdatedProduct: ProductData | null;
  setCurrentUpdatedProduct: React.Dispatch<
    React.SetStateAction<null | ProductData>
  >;
  showCartModal: boolean;
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  cartItem: cartItemArray;
  setCartItem: React.Dispatch<React.SetStateAction<cartItemArray>>;
  addresses: AddressesArray;
  setAddresses: React.Dispatch<React.SetStateAction<AddressesArray>>;
  addressFormData: AddressProp;
  setAddressFormData: React.Dispatch<React.SetStateAction<AddressProp>>;
  checkoutFormData: CheckoutData;
  setCheckoutFormData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  allOrdersForUser: AfterPayOrderDataArray;
  setAllOrdersForUser: React.Dispatch<
    React.SetStateAction<AfterPayOrderDataArray>
  >;
  orderDetails: AfterPayOrderData | null;
  setOrderDetails: React.Dispatch<
    React.SetStateAction<AfterPayOrderData | null>
  >;
  allOrdersForAllUsers: OrderData[];
  setAllOrdersForAllUsers: React.Dispatch<React.SetStateAction<OrderData[]>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalState = ({ children }: GlobalContextProviderProps) => {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(true);
  const [componentLevelLoader, setComponentLevelLoader] =
    useState<componentLoader>({
      loading: false,
      id: '',
    });
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [User, setUser] = useState<User | null>(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] =
    useState<null | ProductData>(null);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<cartItemArray>([]);
  const [addresses, setAddresses] = useState<AddressesArray>([]);
  const [addressFormData, setAddressFormData] =
    useState<AddressProp>(initialAddressObject);
  const [checkoutFormData, setCheckoutFormData] =
    useState<CheckoutData>(initialCheckoutData);
  const [allOrdersForUser, setAllOrdersForUser] =
    useState<AfterPayOrderDataArray>([]);
  const [orderDetails, setOrderDetails] = useState<AfterPayOrderData | null>(
    null
  );
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState<OrderData[]>(
    []
  );

  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    if (Cookies.get('token') !== undefined) {
      setIsAuthUser(true);

      const userData = JSON.parse(localStorage.getItem('user')!) || {}; //exclamation mark tells typescript it can never be null

      const getCartItems = JSON.parse(localStorage.getItem('cartItems')!) || [];

      setUser(userData);
      setCartItem(getCartItems); //to always update it from the local storage incase of checkout
    } else {
      setIsAuthUser(false);
      setUser(null);
    }
  }, []);

  //protectedRoutes from unauthenticated
  useEffect(() => {
    if (
      pathName !== '/register' &&
      User &&
      Object.keys(User).length === 0 &&
      protectedRoutes.includes(pathName)
    ) {
      //if the user has access to the protected route and Unauthenticated,pathName isn't register
      router.push('/login');
    }
  }, [User, pathName, router]);

  //prevents customer from admin routes
  useEffect(() => {
    if (
      User !== null &&
      User &&
      Object.keys(User).length > 0 &&
      User?.role !== 'admin' &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push('/unauthorized-page');
  }, [User, pathName, router]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        User,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItem,
        setCartItem,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
        allOrdersForUser,
        setAllOrdersForUser,
        orderDetails,
        setOrderDetails,
        allOrdersForAllUsers,
        setAllOrdersForAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === null) {
    throw new Error(
      'useActiveSectionContext must be used within an ActiveSectionContextProvider'
    );
  }

  return context;
};
