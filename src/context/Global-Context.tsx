'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface componentLoader {
  loading: boolean;
  id: string;
}

interface User {
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
  setpageLevelLoader: React.Dispatch<React.SetStateAction<boolean>>;
  User: User | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  isAuthUser: boolean | null;
};
export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalState = ({ children }: GlobalContextProviderProps) => {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [pageLevelLoader, setpageLevelLoader] = useState<boolean>(false);
  const [componentLevelLoader, setComponentLevelLoader] =
    useState<componentLoader>({
      loading: false,
      id: '',
    });
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (Cookies.get('token') !== undefined) {
      setIsAuthUser(true);

      const userData = JSON.parse(localStorage.getItem('user')!) || {}; //exclamation mark tells typescript it can never be null

      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setpageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        User,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
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
