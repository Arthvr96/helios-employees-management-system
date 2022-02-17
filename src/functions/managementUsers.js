import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth2, db } from 'api/firebase/firebase.config';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import uniqid from 'uniqid';
import { dispoPlaceholder } from 'helpers/helpers';

export const managementUsers = () => {
  const updateUserInfo = async (id, values) => {
    const userInfoRef = doc(db, 'users', id);
    const respond = await updateDoc(userInfoRef, {
      ...values,
    }).catch((error) => {
      throw error;
    });
    return respond;
  };

  const deleteUser = async (id, dispoSendInfo) => {
    await deleteDoc(doc(db, 'users', id)).catch((error) => {
      window.alert(error.code);
    });
    await deleteDoc(doc(db, 'dispositionsSortedEmployees', id)).catch((error) => {
      window.alert(error.code);
    });

    const obj = {};
    for (const key in dispoSendInfo) {
      if ({}.hasOwnProperty.call(dispoSendInfo, key)) {
        if (key !== id) {
          obj[key] = JSON.parse(JSON.stringify(dispoSendInfo[key]));
        }
      }
    }
    const userInfoRef = doc(db, 'statesApp', 'dispoSendInfo');
    await setDoc(userInfoRef, obj).catch((error) => {
      window.alert(error.code);
    });
  };

  const createUser = async (values, workplaces, adminRole, dispoSendInfo, appState) => {
    const checkAlias = async () => {
      let respond = false;
      if (!adminRole) {
        const alias = values.alias.toLowerCase();
        const q = query(collection(db, 'users'), where('alias', '==', alias));
        await getDocs(q)
          .then((docs) => {
            respond = docs.size === 0;
          })
          .catch((error) => {
            respond = false;
            window.alert(error.code);
          });
      } else if (adminRole) {
        respond = true;
      }
      return respond;
    };

    const createAuthUser = async (email) => {
      let respond;
      await createUserWithEmailAndPassword(auth2, email, uniqid())
        .then((userCredential) => {
          signOut(auth2).catch((error) => {
            window.alert(error.code);
          });
          respond = {
            status: true,
            uid: userCredential.user.uid,
          };
        })
        .catch((error) => {
          respond = { status: false, error: error.code };
        });
      return respond;
    };

    const addUserInfo = async (uid) => {
      let obj;

      if (adminRole) {
        obj = {
          id: uid,
          firstName: values.firstName.toLowerCase().trim(),
          lastName: values.lastName.toLowerCase().trim(),
          email: values.email.toLowerCase().trim(),
          role: 'admin',
        };
      } else {
        obj = {
          id: uid,
          firstName: values.firstName.toLowerCase().trim(),
          lastName: values.lastName.toLowerCase().trim(),
          email: values.email.toLowerCase().trim(),
          alias: values.alias.toLowerCase().trim(),
          role: 'user',
          workplaces,
        };
      }

      let respond;
      await setDoc(doc(db, 'users', uid), { ...obj })
        .then(() => {
          respond = {
            uid,
            status: true,
          };
        })
        .catch((error) => {
          respond = {
            status: false,
            error: error.code,
          };
        });
      return respond;
    };

    const addUserToDispoDb = async (uid) => {
      let respond;
      await setDoc(doc(db, 'dispositionsSortedEmployees', uid), { alias: values.alias })
        .then(() => {
          respond = {
            uid,
            status: true,
          };
        })
        .catch((error) => {
          respond = {
            status: false,
            error: error.code,
          };
        });
      return respond;
    };
    const addUserToDispoSendInfoDb = async (uid) => {
      const obj = JSON.parse(JSON.stringify(dispoSendInfo));
      let respond;
      await setDoc(doc(db, 'statesApp', 'dispoSendInfo'), {
        ...obj,
        [uid]: {
          status: false,
          info: {
            email: values.email.toLowerCase().trim(),
            firstName: values.firstName.toLowerCase().trim(),
            lastName: values.lastName.toLowerCase().trim(),
          },
        },
      })
        .then(() => {
          respond = {
            uid,
            status: true,
          };
        })
        .catch((error) => {
          respond = {
            status: false,
            error: error.code,
          };
        });
      return respond;
    };

    const addCycleToDispoDb = async (uid) => {
      let respond;
      const date = `${appState.date1}-${appState.date2}`;
      let data = {};
      if (appState.state === 'blocked') {
        data = {
          [date]: dispoPlaceholder,
        };
      } else if (appState.state === 'active') {
        data = {
          [date]: {},
        };
      }
      await updateDoc(doc(db, 'dispositionsSortedEmployees', uid), data)
        .then(() => {
          respond = {
            uid,
            status: true,
          };
        })
        .catch((error) => {
          respond = {
            status: false,
            error: error.code,
          };
        });
      return respond;
    };

    const respondCheckAlias = await checkAlias();
    const respondCreateAuthUser = respondCheckAlias
      ? await createAuthUser(values.email)
      : { status: false, error: 'firestore/alias-already-in-use' };

    let respondAddUserInfo;
    if (respondCreateAuthUser.status) {
      respondAddUserInfo = await addUserInfo(respondCreateAuthUser.uid);
    } else if (!respondCreateAuthUser.status) {
      respondAddUserInfo = { status: false, error: respondCreateAuthUser.error };
    }

    if (respondAddUserInfo.status) {
      respondAddUserInfo = await addUserToDispoDb(respondCreateAuthUser.uid);
    }

    if (respondAddUserInfo.status) {
      respondAddUserInfo = await addUserToDispoSendInfoDb(respondCreateAuthUser.uid);
    }

    if (respondAddUserInfo.status && appState.state !== 'nonActive') {
      respondAddUserInfo = await addCycleToDispoDb(respondCreateAuthUser.uid);
    }

    return respondAddUserInfo;
  };

  return {
    createUser,
    updateUserInfo,
    deleteUser,
  };
};
