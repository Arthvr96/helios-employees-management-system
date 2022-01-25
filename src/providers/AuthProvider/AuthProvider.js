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

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setAuthAdmin(false);
        setAuthUser(false);
        window.localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
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
    const { authType } = window.localStorage;
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
            console.log(error);
          });
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscriber();
    };
  }, []);

  const values = { currentUser, authUser, authAdmin, logIn, logOut, updateUserProfile };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
