'use client';

import React, { createContext, useContext, useState } from 'react';

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

type GlobalContextType = {
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  commonLoader: boolean;
  setCommonLoader: React.Dispatch<React.SetStateAction<boolean>>;
  User: string | object | null;
  setUser: React.Dispatch<React.SetStateAction<string | object | null>>;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  isAuthUser: boolean | null;
};
export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalState = ({ children }: GlobalContextProviderProps) => {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [commonLoader, setCommonLoader] = useState<boolean>(false);
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [User, setUser] = useState<string | object | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        commonLoader,
        setCommonLoader,
        isAuthUser,
        setIsAuthUser,
        User,
        setUser,
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
