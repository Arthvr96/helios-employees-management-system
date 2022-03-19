import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { useHistory } from 'react-router-dom';
import { usePrevious } from 'hooks/usePrevious';

const GlobalStateContext = React.createContext({});

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

const GlobalStateProvider = ({ children }) => {
  const { logIn, logOut, resetPassword, sessionObserver } = heliosAppSdk.auth;
  const { changeStateApp, cycleStateObserver, dispoSendInfoObserver, settingsObserver } =
    heliosAppSdk.appState;
  const { appInfo } = heliosAppSdk;
  const [appState, setAppState] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [authAdmin, setAuthAdmin] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [dispoSendInfo, setDispoSendInfo] = useState({});
  const [settings, setSettings] = useState({ ...appInfo });
  const [isProcessingState, setProcessingState] = useState(false);
  const history = useHistory();
  const prevAppState = usePrevious(appState.state);

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
        window.location.replace('index.html');
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
    setProcessingState(true);
    changeStateApp(target, values, appState, dispoSendInfo)
      .then(() => {
        window.setTimeout(() => {
          setProcessingState(false);
        }, 300);
      })
      .catch((error) => {
        window.alert(error.code);
        handleLogOut();
      });
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

  useEffect(() => {
    let unsub = () => {};

    unsub = settingsObserver(setSettings);

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    // When user is logged and admin change state app from nonActive to Active user has to be logout.
    if (authUser) {
      if (appState.state === 'active' && prevAppState === 'nonActive') {
        handleLogOut();
      }
    }
  }, [appState]);

  useEffect(() => {
    if (settings.version !== appInfo.version) {
      if (authUser || authAdmin) {
        window.alert(
          'Aplikacja nie jest akutalna. Karta z aplikacją zostanie odswieżona po zamknieciu tego okna',
        );
        handleLogOut();
      } else {
        window.alert(
          'Aplikacja nie jest akutalna. Karta z aplikacją zostanie odswieżona po zamknieciu tego okna',
        );
        setCurrentUser(null);
        setAuthAdmin(false);
        setAuthUser(false);
        localStorage.clear();
        history.push('/login');
        window.location.replace('index.html');
      }
    }
  }, [settings]);

  const values = {
    appState,
    currentUser,
    authAdmin,
    authUser,
    dispoSendInfo,
    settings,
    isProcessingState,
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
