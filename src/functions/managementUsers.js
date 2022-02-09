import { collection, doc, getDocs, query, setDoc, where, updateDoc } from 'firebase/firestore';
import { auth2, db } from 'api/firebase/firebase.config';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import uniqid from 'uniqid';

export const managementUsers = () => {
  const updateUserInfo = async (id, values) => {
    const userInfoRef = doc(db, 'users', id);
    const resond = await updateDoc(userInfoRef, {
      ...values,
    }).catch((error) => {
      throw error;
    });
    return resond;
  };

  const createUser = async (values, workplaces, adminRole) => {
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
            error,
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

    return respondAddUserInfo;
  };

  return {
    createUser,
    updateUserInfo,
  };
};
