'use client';

import React, { createContext } from 'react';

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

type GlobalContextType = {};
export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalState = ({ children }: GlobalContextProviderProps) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
