import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from 'api/firebase/firebase.config';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authAdmin, setAuthAdmin] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [appState, setAppState] = useState({ state: 'nonActive', date1: '', date2: '' });
  const history = useHistory();

  const _updateAppState = (id, data) => {
    return setDoc(doc(db, 'statesApp', id), data);
  };

  const getUserInfo = async (id) => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef).catch((error) => {
      throw error;
    });
    return docSnap;
  };

  const logIn = async (email, password) => {
    setInProgress(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setInProgress(false);
        return true;
      })
      .catch((error) => {
        setInProgress(false);
        throw error;
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setAuthAdmin(false);
        setAuthUser(false);
        localStorage.clear();
      })
      .catch((error) => {
        window.alert(`Wylogowanie nie powiodło się | Error-code : ${error.code}`);
        window.location.reload();
      });
  };

  const resetPassword = async (email) => {
    setInProgress(true);
    const respond = await sendPasswordResetEmail(auth, email)
      .then(() => {
        setInProgress(false);
        return true;
      })
      .catch((error) => {
        setInProgress(false);
        throw error;
      });

    return respond;
  };

  const handleSetAppState = async (switcher, week) => {
    if (switcher === 'newCycle') {
      await _updateAppState('cycleState', {
        state: 'active',
        date1: week.date1,
        date2: week.date2,
      }).catch((error) => {
        throw error;
      });
    }
    if (switcher === 'blockCycle') {
      await _updateAppState('cycleState', {
        ...appState,
        state: 'blocked',
      }).catch((error) => {
        throw error;
      });
    }
    if (switcher === 'endCycle') {
      await _updateAppState('cycleState', {
        ...appState,
        state: 'nonActive',
        date1: '',
        date2: '',
      }).catch((error) => {
        throw error;
      });
    }
  };

  useEffect(() => {
    let unsub = () => {};
    if (authAdmin || authUser) {
      unsub = onSnapshot(doc(db, 'statesApp', 'cycleState'), (item) => {
        setAppState({ ...item.data() });
      });
    }

    return () => {
      unsub();
    };
  }, [authAdmin, authUser]);

  useEffect(() => {}, []);

  useEffect(() => {
    let sessionEnded = false;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        sessionEnded = true;
        history.push('/login');
        return signOut(auth);
      })
      .catch((error) => window.alert(error.code));

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getUserInfo(user.uid)
          .then((respond) => {
            setInProgress(false);
            if (respond.data().role === 'admin') {
              setAuthAdmin(true);
              setCurrentUser({ ...respond.data() });
            } else if (respond.data().role === 'user') {
              setAuthUser(true);
              setCurrentUser({ ...respond.data() });
            } else {
              throw 'Nie znana rola';
            }
          })
          .catch((error) => {
            if (!sessionEnded) {
              logOut(auth);
              window.alert(`critical error : ${error}`);
            }
            setInProgress(false);
          });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const values = {
    currentUser,
    authUser,
    authAdmin,
    inProgress,
    appState,
    logIn,
    logOut,
    resetPassword,
    handleSetAppState,
    getUserInfo,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
