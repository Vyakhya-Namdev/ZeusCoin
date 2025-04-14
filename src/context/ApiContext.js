import React, { createContext } from 'react';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const apiKeys = {
    main: process.env.REACT_APP_COINGECKO_API_KEY_MAIN,
    chart: process.env.REACT_APP_COINGECKO_API_KEY_CHART,
    data: process.env.REACT_APP_COINGECKO_API_KEY_DATA
  };

  // Verify keys are present
  const keysValid = Object.values(apiKeys).every(key => !!key);

  return (
    <ApiContext.Provider value={{ apiKeys, keysValid }}>
      {children}
    </ApiContext.Provider>
  );
};