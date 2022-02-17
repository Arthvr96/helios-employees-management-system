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
  const [appState, setAppState] = useState({});
  const history = useHistory();

  const getUserInfo = async (id) => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef).catch((error) => {
      throw error;
    });
    return docSnap;
  };

  const addBasicInfo = async (values) => {
    // in the future to delete.
    return setDoc(doc(db, 'basicInfo', values.email), values);
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
        history.push('/login');
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

  useEffect(() => {
    // Run after signIn.
    // Method observe statesApp/cycleState in firestore and update appState on any change.

    let unsub = () => {};
    if (authAdmin || authUser) {
      unsub = onSnapshot(doc(db, 'statesApp', 'cycleState'), (item) => {
        setAppState({ ...item.data() });
        if (item.data().state === 'blocked') {
          localStorage.removeItem('options');
          localStorage.removeItem('dispoRespond');
        }
      });
    }

    return () => {
      unsub();
    };
  }, [authAdmin, authUser]);

  useEffect(() => {
    // Run on app start.
    // setPersistence method listening on end of session (session ends whenever browser get refresh or user close the tab with app).
    // onAuthStateChanged - method which observe changes on auth object.
    // After signIn, script check role of signed user.

    let sessionEnded = false;

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        sessionEnded = true;
        localStorage.clear();
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
    getUserInfo,
    addBasicInfo,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
