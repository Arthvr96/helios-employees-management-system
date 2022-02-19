import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { useHistory } from 'react-router-dom';

const GlobalStateContext = React.createContext({});

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

const GlobalStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [authAdmin, setAuthAdmin] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const { logIn, logOut, resetPassword, sessionObserver, cycleStateObserver } = heliosAppSdk.auth;
  const history = useHistory();

  const handleLogIn = (email, password) => {
    return logIn(email, password).then((userInfo) => {
      setCurrentUser(userInfo);
      if (userInfo.role === 'admin') {
        setAuthAdmin(true);
      } else if (userInfo.role === 'user') {
        setAuthUser(true);
      }
    });
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setCurrentUser(null);
        setAuthAdmin(false);
        setAuthUser(false);
        localStorage.clear();
        history.push('/login');
      })
      .catch((error) => {
        window.alert(`Wylogowanie nie powiodło się | Error-code : ${error.code}`);
        window.location.reload();
      });
  };

  const handleResetPassword = (email) => {
    return resetPassword(email);
  };

  useEffect(() => {
    sessionObserver();
  }, []);

  useEffect(() => {
    cycleStateObserver(authAdmin, authUser, setAppState);
  }, [authAdmin, authUser]);

  const values = {
    appState,
    currentUser,
    authAdmin,
    authUser,
    handleLogIn,
    handleLogOut,
    handleResetPassword,
  };

  return <GlobalStateContext.Provider value={values}>{children}</GlobalStateContext.Provider>;
};

export default GlobalStateProvider;

GlobalStateProvider.propTypes = {
  children: PropTypes.node,
};
