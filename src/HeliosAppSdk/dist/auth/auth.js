import uniqid from 'uniqid';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, auth2 } from 'api/firebase/firebase.config';
import firestoreConstants from '../firestoreConstatns/firestoreConstants';
import { firestoreRequest } from '../firestoreRequest/firestoreRequest';
import {
  __handleDeleteDoc__,
  __handleGetDocs__,
  __handleSetDoc__,
  __handleUpdateDoc__,
} from '../firestoreFunctionsPrivate/firestoreFunctionsPrivate';
import { dispoPlaceholder } from '../helpers/helpers';

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

const updateUserInfo = (id, values) => {
  const { users } = firestoreConstants.paths;
  return __handleUpdateDoc__(users, id, { ...values });
};

const deleteUser = (id, dispoSendInfo) => {
  const { users, dispositionsEmployees, stateApp } = firestoreConstants.paths;
  return __handleDeleteDoc__(users, id)
    .then(() => __handleDeleteDoc__(dispositionsEmployees, id))
    .then(() => {
      const obj = {};
      for (const key in dispoSendInfo) {
        if ({}.hasOwnProperty.call(dispoSendInfo, key)) {
          if (key !== id) {
            obj[key] = JSON.parse(JSON.stringify(dispoSendInfo[key]));
          }
        }
      }
      __handleSetDoc__(stateApp.pathName, stateApp.segments.dispoSendInfo, obj).catch((error) =>
        window.alert(error.code),
      );
    });
};

const createUser = async (values, workplaces, adminRole, dispoSendInfo, appState) => {
  const { users, dispositionsEmployees, stateApp, dispositionsCycles } = firestoreConstants.paths;

  const __checkAlias__ = () => {
    const alias = values.alias.toLowerCase();
    return __handleGetDocs__(users, 'alias', '==', alias);
  };

  const __createAuthUser__ = () => {
    return createUserWithEmailAndPassword(auth2, values.email, uniqid()).then((userCredential) => {
      signOut(auth2).catch((error) => window.alert(error.code));
      return userCredential.user.uid;
    });
  };

  const __addUserInfo__ = async (uid) => {
    let obj;
    const shape = {
      id: uid,
      firstName: values.firstName.toLowerCase().trim(),
      lastName: values.lastName.toLowerCase().trim(),
      email: values.email.toLowerCase().trim(),
    };

    if (adminRole) {
      obj = {
        ...shape,
        role: 'admin',
      };
    } else {
      obj = {
        ...shape,
        alias: values.alias.toLowerCase().trim(),
        role: 'user',
        workplaces,
      };
    }
    return __handleSetDoc__(users, uid, { ...obj });
  };

  const __addUserToDispositionsEmployees__ = (uid) => {
    return __handleSetDoc__(dispositionsEmployees, uid, {
      alias: values.alias.toLowerCase(),
    });
  };

  const __addUserToDispoSendInfo__ = (uid) => {
    const obj = JSON.parse(JSON.stringify(dispoSendInfo));

    const data = {
      ...obj,
      [uid]: {
        status: false,
        info: {
          email: values.email.toLowerCase().trim(),
          firstName: values.firstName.toLowerCase().trim(),
          lastName: values.lastName.toLowerCase().trim(),
        },
      },
    };
    return __handleSetDoc__(stateApp.pathName, stateApp.segments.dispoSendInfo, data);
  };

  const __addNewCycleToDispositionsEmployees__ = (uid) => {
    // If user will be created in another cycle than 'nonActive',new cycle in dispositionsEmployees
    // has to be added.
    const date = `${appState.date1}-${appState.date2}`;
    let data = {};
    if (appState.state === 'blocked') {
      data = {
        [date]: dispoPlaceholder,
      };
      __handleUpdateDoc__(dispositionsCycles, date, {
        [uid]: {
          alias: values.alias.toLowerCase(),
          disposition: dispoPlaceholder,
        },
      }).catch((error) => window.alert(error.code));
    } else if (appState.state === 'active') {
      data = {
        [date]: {},
      };
    }
    return __handleUpdateDoc__(dispositionsEmployees, uid, data);
  };

  return __checkAlias__()
    .then((docs) => {
      return new Promise((resolve, reject) => {
        if (adminRole || docs.size === 0) {
          resolve(__createAuthUser__());
        } else {
          reject(new Error('firestore/alias-already-in-use'));
        }
      });
    })
    .then((uid) => {
      if (!adminRole) {
        __addUserInfo__(uid)
          .then(() => __addUserToDispositionsEmployees__(uid))
          .then(() => __addUserToDispoSendInfo__(uid))
          .then(() => __addNewCycleToDispositionsEmployees__(uid))
          .catch((error) => {
            throw error;
          });
      } else {
        __addUserInfo__(uid).catch((error) => {
          throw error;
        });
      }
      return uid;
    });
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
  updateUserInfo,
  deleteUser,
  createUser,
  sessionObserver,
};
