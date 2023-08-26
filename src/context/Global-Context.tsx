'use client';

import React, { createContext, useContext, useState } from 'react';

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

type GlobalContextType = {
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalState = ({ children }: GlobalContextProviderProps) => {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ showNavModal, setShowNavModal }}>
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
