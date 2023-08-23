import React, { Fragment } from 'react';

const isAdminView: boolean = false;
const isAuthUser: boolean = false;
const user = {
  role: 'admin',
};

const NavItems = () => {
  return (
    <div
      className='items-center justify-between w-full md:flex md:w-auto '
      id='nav-items'
    >
      <ul className='flex flex-col p-4 md:p-4 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white'></ul>
    </div>
  );
};

export const NavBar = () => {
  return (
    <>
      <nav className='bg-white/90 fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <div className='flex items-center cursor-pointer'>
            <span className='self-center text-2xl font-semibold text-gray-950 whitespace-nowrap'>
              JuExpress
            </span>
          </div>
          <div className='flex md:order-2 gap-2 text-gray-950'>
            {!isAdminView && isAuthUser ? ( //check if admin or authUser
              <Fragment>
                <button>Account</button>
                <button>Cart</button>
              </Fragment>
            ) : null}
            {user?.role === 'admin' ? (
              isAdminView ? (
                <button>Client View</button>
              ) : (
                <button>Admin View</button>
              )
            ) : null}
            {isAuthUser ? <button>Logout</button> : <button>Login</button>}
          </div>
        </div>
      </nav>
    </>
  );
};
