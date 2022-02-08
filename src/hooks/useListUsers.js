import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';

export const useListUsers = () => {
  const [completeList, setList] = useState([]);

  const getCollection = async (path) => {
    const q = query(collection(db, path), where('role', '==', 'user'));
    const querySnapshot = await getDocs(q).catch((error) => {
      return error.message;
    });
    return querySnapshot;
  };

  useEffect(() => {
    if (!localStorage.usersList) {
      getCollection('users').then((usersCollection) => {
        const list = [];
        if (usersCollection) {
          usersCollection.forEach((userDoc) => {
            list.push({ id: userDoc.id, ...userDoc.data() });
          });
        }
        setList([...list]);
        localStorage.setItem('usersList', JSON.stringify(list));
      });
    } else if (localStorage.usersList) {
      setList([...JSON.parse(localStorage.usersList)]);
    }
  }, []);

  return completeList;
};
