'use client';

import React, { Fragment, useEffect } from 'react';
import { adminNavOptions, navOptions } from '@/utils/ConstantData';
import { useGlobalContext } from '@/context/Global-Context';
import CommonModal from '../commonModal/CommonModal';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { CartModal } from '../cartModal/CartModal';

// const isAdminView: boolean = false;
// const isAuthUser: boolean = true;
// const user = {
//   role: 'admin',
// };

type NavItemsProp = {
  isModalView: boolean;
  isAdminView: boolean;
  router: AppRouterInstance;
};

const NavItems = ({
  isModalView = false,
  isAdminView,
  router,
}: NavItemsProp) => {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? '' : 'hidden'
      }`}
      id='nav-items'
    >
      <ul
        className={`flex flex-col p-4 md:p-4 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? 'border-none' : 'border border-gray-100'
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0'
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0'
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
};

export const NavBar = () => {
  const router = useRouter();

  const pathName = usePathname(); //for navigating using /path-name

  const isAdminView = pathName.includes('admin-view'); //to check if it is admin-view

  const {
    showNavModal,
    setShowNavModal,
    User,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useGlobalContext();

  useEffect(() => {
    if (
      pathName !== '/admin-view/add-product' &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null); //if we are not in the add product page and the currentupdatedproductData is still set in the form we set it to null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove('token');
    localStorage.clear();
    router.push('/');
  };

  return (
    <>
      <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 '>
        <div className='max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 '>
          <div
            onClick={() => router.push('/')}
            className='flex items-center cursor-pointer'
          >
            <span className='self-center text-2xl font-semibold text-gray-950 whitespace-nowrap'>
              JuExpress
            </span>
          </div>
          <div className='flex md:order-2 gap-1 '>
            {!isAdminView && isAuthUser ? ( //check if admin or authUser
              <Fragment>
                <button
                  onClick={() => router.push('/account')}
                  className='mt-1.5 inline-block py-3 px-3.5 sm:px-5 sm:py-3 text-xs font-medium uppercase tracking-wide text-white bg-black'
                >
                  Account
                </button>
                <button
                  onClick={() => {
                    setShowCartModal(true);
                  }}
                  className='mt-1.5 inline-block py-3 px-3.5 sm:px-5 sm:py-3 text-xs font-medium uppercase tracking-wide text-white bg-black'
                >
                  Cart
                </button>
              </Fragment>
            ) : null}
            {User?.role === 'admin' ? (
              isAdminView ? (
                <button
                  onClick={() => router.push('/')}
                  className='mt-1.5 inline-block py-3 px-3.5 sm:px-5 sm:py-3 text-xs font-medium uppercase tracking-wide text-white bg-black'
                >
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => router.push('/admin-view')}
                  className='mt-1.5 inline-block py-3 px-3.5 sm:px-5 sm:py-3 text-xs font-medium uppercase tracking-wide text-white bg-black'
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className='mt-1.5 inline-block py-3 px-3.5 sm:px-5 sm:py-3 text-xs font-medium uppercase tracking-wide text-white bg-black'
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className='mt-1.5 inline-block py-3 px-3.5 sm:px-5 sm:py-3 text-xs font-medium uppercase tracking-wide text-white bg-black'
              >
                Login
              </button>
            )}
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className={
                pathName === '/admin-view'
                  ? 'inline-flex ml-10 justify-between items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                  : 'inline-flex justify-between items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              }
              aria-controls='navbar-sticky'
              aria-expanded='false'
              onClick={() => {
                setShowNavModal(true);
                if (showNavModal) setShowNavModal(false);
              }}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <NavItems
            isModalView={false}
            isAdminView={isAdminView}
            router={router}
          />
        </div>
      </nav>
      <CommonModal
        show={showNavModal}
        setShow={setShowNavModal}
        showModalTitle={false}
        mainContent={
          <NavItems
            isModalView={true}
            isAdminView={isAdminView}
            router={router}
          />
        }
      />
      {showCartModal && <CartModal />}
    </>
  );
};
