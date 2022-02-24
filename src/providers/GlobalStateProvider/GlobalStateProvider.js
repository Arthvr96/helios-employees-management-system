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
  const [dispoSendInfo, setDispoSendInfo] = useState({});
  const { logIn, logOut, resetPassword, sessionObserver } = heliosAppSdk.auth;
  const { changeStateApp, cycleStateObserver, dispoSendInfoObserver } = heliosAppSdk.appState;
  const history = useHistory();

  const handleLogIn = (email, password) => {
    const { roles } = heliosAppSdk.firestoreConstants;
    return logIn(email, password).then((userInfo) => {
      setCurrentUser(userInfo);
      if (userInfo.role === roles.admin) {
        setAuthAdmin(true);
      } else if (userInfo.role === roles.user) {
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

  const handleChangeStateApp = (target, values) => {
    changeStateApp(target, values, appState, dispoSendInfo).catch((error) =>
      window.alert(error.code),
    );
  };

  useEffect(() => {
    sessionObserver();
  }, []);

  useEffect(() => {
    let unsub = () => {};

    if (authAdmin) {
      unsub = dispoSendInfoObserver(setDispoSendInfo);
    }

    return () => {
      unsub();
    };
  }, [authAdmin]);

  useEffect(() => {
    let unsub = () => {};

    if (authAdmin || authUser) {
      unsub = cycleStateObserver(setAppState);
    }

    return () => {
      unsub();
    };
  }, [authAdmin, authUser]);

  const values = {
    appState,
    currentUser,
    authAdmin,
    authUser,
    dispoSendInfo,
    handleLogIn,
    handleLogOut,
    handleResetPassword,
    handleChangeStateApp,
  };

  return <GlobalStateContext.Provider value={values}>{children}</GlobalStateContext.Provider>;
};

export default GlobalStateProvider;

GlobalStateProvider.propTypes = {
  children: PropTypes.node,
};
