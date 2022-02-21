import {
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from 'api/firebase/firebase.config';
import { firestoreRequest } from './firestoreRequest';

const logIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;
  const userInfo = await firestoreRequest.getUserInfo(uid);
  return userInfo.data();
};

const logOut = () => {
  return signOut(auth);
};

const resetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

const sessionObserver = () => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      localStorage.clear();
      return signOut(auth);
    })
    .catch((error) => {
      window.alert(error.code);
      localStorage.clear();
      window.location.reload();
    });
};

export const authFunctions = {
  logIn,
  logOut,
  resetPassword,
  sessionObserver,
};
