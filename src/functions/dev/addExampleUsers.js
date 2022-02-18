import { exampleUsers } from 'data/exampleUsers';
import { managementUsers } from 'functions/managementUsers';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';

export const addExampleUsers = async () => {
  const { createUser } = managementUsers();
  exampleUsers.forEach((user, i) => {
    const { firstName, lastName, email, alias, workplaces } = user;
    const values = {
      firstName,
      lastName,
      email,
      alias,
    };
    createUser(values, workplaces, false).catch((error) => {
      console.log(error);
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
