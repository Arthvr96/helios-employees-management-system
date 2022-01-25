import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from 'api/firebase/firebase.config';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authAdmin, setAuthAdmin] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const logIn = async (email, password) => {
    setInProgress(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
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
        setAuthAdmin(false);
        setAuthUser(false);
        localStorage.clear();
      })
      .catch((error) => {
        window.alert(`Wylogowanie nie powiodło sie: ${error}`);
        localStorage.clear();
      });
  };

  const updateUserProfile = (values) => {
    return updateProfile(auth.currentUser, values);
  };

  const getUserRole = async (id) => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap;
  };

  useEffect(() => {
    const { authType } = localStorage;
    if (authType === 'admin') {
      setAuthAdmin(true);
    } else if (authType === 'user') {
      setAuthUser(true);
    }
  }, []);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getUserRole(user.uid)
          .then((respond) => {
            setInProgress(false);
            if (respond.data().role === 'admin') {
              setAuthAdmin(true);
              window.localStorage.setItem('authType', 'admin');
            } else if (respond.data().role === 'user') {
              setAuthUser(true);
              window.localStorage.setItem('authType', 'user');
            } else {
              throw 'Nie znana rola';
            }
          })
          .catch((error) => {
            window.alert(`critical error : ${error}`);
            setInProgress(false);
            localStorage.clear();
          });
      } else {
        setCurrentUser(null);
        setInProgress(false);
        localStorage.clear();
      }
    });

    return () => {
      unsubscriber();
    };
  }, []);

  const values = { currentUser, authUser, authAdmin, inProgress, logIn, logOut, updateUserProfile };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
