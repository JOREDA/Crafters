import React, { createContext, useContext, useState } from 'react';
import Loader from '../Loader';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {isLoading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}; 