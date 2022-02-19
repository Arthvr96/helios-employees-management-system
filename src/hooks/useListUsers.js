import { useEffect, useState } from 'react';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';

export const useListUsers = () => {
  const [completeList, setList] = useState([]);
  const { getEmployeesList } = HeliosAppSdk.firestore;

  useEffect(() => {
    if (!localStorage.usersList) {
      getEmployeesList().then((usersCollection) => {
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
