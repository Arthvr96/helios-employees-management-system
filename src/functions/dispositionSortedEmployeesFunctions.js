import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';

export const dispositionSortedEmployeesFuncs = () => {
  const getEmployeeDispositions = async (id) => {
    let respond;
    const q = query(collection(db, 'users', id));
    await getDocs(q)
      .then((querySnapshot) => {
        respond = querySnapshot.data();
      })
      .catch((error) => throw error);
    return respond;
  };

  return {
    getEmployeeDispositions,
  };
};
