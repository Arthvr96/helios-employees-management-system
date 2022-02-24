import { exampleUsers } from 'functions/dev/exampleUsers';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';

export const addExampleUsers = async () => {
  const { createUser } = HeliosAppSdk.auth;
  exampleUsers.forEach((user, i) => {
    const { firstName, lastName, email, alias, workplaces } = user;
    const values = {
      firstName,
      lastName,
      email,
      alias,
    };
    createUser(values, workplaces, false).catch((error) => {
      window.alert(error.code);
    });
  });
};

export const addingToUserState = async () => {
  const q = query(collection(db, 'users'), where('role', '==', 'user'));
  await getDocs(q)
    .then((docs) => {
      let obj = {};
      docs.forEach((docItem) => {
        obj = {
          ...obj,
          [docItem.data().id]: {
            status: false,
            info: {
              firstName: docItem.data().firstName,
              lastName: docItem.data().lastName,
              email: docItem.data().email,
            },
          },
        };
      });
      setDoc(doc(db, 'statesApp', 'dispoSendInfo'), obj).catch((error) => {
        window.alert(error.code);
      });
    })
    .catch((error) => {
      window.alert(error.code);
    });
};

export const clearDispositionsEmployees = () => {
  const q = query(collection(db, 'dispositionsSortedEmployees'));
  getDocs(q).then((respond) => {
    respond.forEach((docItem) => {
      setDoc(doc(db, 'dispositionsSortedEmployees', docItem.id), {
        alias: docItem.data().alias,
      })
        .then(() => console.log('updated'))
        .catch((error) => window.alert(error.code));
    });
  });
};
