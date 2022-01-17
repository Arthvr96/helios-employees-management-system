import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalStateContext = createContext({
  cycleState: '',
  changeCycle: () => {},
});

const GlobalStateProvider = ({ children }) => {
  const [cycleState, setCycle] = useState('active');

  const changeCycle = (option) => {
    if (option === 'new' || option === 'active' || option === 'blocked') {
      setCycle(option);
    }
  };

  return (
    <GlobalStateContext.Provider value={{ cycleState, changeCycle }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;

GlobalStateProvider.propTypes = {
  children: PropTypes.node,
};
