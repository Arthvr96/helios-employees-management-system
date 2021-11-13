import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const GlobalStateContext = createContext({});

const GlobalStateProvider = ({ children }) => {
  return <GlobalStateContext.Provider value={{}}>{children}</GlobalStateContext.Provider>;
};

export default GlobalStateProvider;

GlobalStateProvider.propTypes = {
  children: PropTypes.node,
};
