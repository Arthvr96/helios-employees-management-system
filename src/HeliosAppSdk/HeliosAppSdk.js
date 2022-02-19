import {
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from 'api/firebase/firebase.config';
import { doc, getDoc, onSnapshot, query, collection, where, getDocs } from 'firebase/firestore';

const firestoreConstants = {
  paths: {
    users: 'users',
  },
  roles: {
    admin: 'admin',
    user: 'user',
  },
};

// private help functions

const __handleGetDoc__ = (collectionName, documentName) => {
  return getDoc(doc(db, collectionName, documentName));
};

const __hadnleGetDocs__ = async (collectionName, fieldPath, opStr, value) => {
  let q;

  if (fieldPath !== undefined && opStr !== undefined && value !== undefined) {
    q = query(collection(db, collectionName), where(fieldPath, opStr, value));
  } else {
    q = query(collection(db, collectionName));
  }

  return getDocs(q);
};

// firestore requests

const getUserInfo = (id) => {
  return __handleGetDoc__(firestoreConstants.paths.users, id);
};

const getEmployeesList = async () => {
  const employeesList = await __hadnleGetDocs__(
    firestoreConstants.paths.users,
    'role',
    '==',
    firestoreConstants.roles.user,
  );
  return employeesList;
};

// auth functions

const logIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;
  const userInfo = await getUserInfo(uid);
  return userInfo.data();
};

const logOut = () => {
  return signOut(auth);
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

const cycleStateObserver = (authAdmin, authUser, setAppState) => {
  let unsub = () => {};
  if (authAdmin || authUser) {
    unsub = onSnapshot(doc(db, 'statesApp', 'cycleState'), (item) => {
      setAppState({ ...item.data() });
      // This localStorage reset is necessary. Look doc.
      if (item.data().state === 'blocked' && authAdmin) {
        localStorage.removeItem('options');
        localStorage.removeItem('dispoRespond');
      }
    });
  }

  return () => {
    unsub();
  };
};

const resetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

const heliosAppSdk = {
  firestoreConstants,
  auth: {
    logIn,
    logOut,
    resetPassword,
    sessionObserver,
    cycleStateObserver,
  },
  firestore: {
    getUserInfo,
    getEmployeesList,
  },
};

export default heliosAppSdk;
