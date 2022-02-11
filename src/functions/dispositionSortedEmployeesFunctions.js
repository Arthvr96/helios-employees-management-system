import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';

const docSchema = {
  day1: ['freeDay', '8', '30', false, false],
  day2: ['freeDay', '8', '30', false, false],
  day3: ['freeDay', '8', '30', false, false],
  day4: ['freeDay', '8', '30', false, false],
  day5: ['freeDay', '8', '30', false, false],
  day6: ['freeDay', '8', '30', false, false],
  day7: ['freeDay', '8', '30', false, false],
};

export const dispositionSortedEmployeesFunctions = () => {
  const getEmployeeDispositions = async (id) => {
    const docRef = doc(db, 'dispositionsSortedEmployees', id);
    const docSnap = await getDoc(docRef)
      .then((docSnapshot) => {
        return docSnapshot.data();
      })
      .catch((error) => {
        throw error;
      });
    return docSnap;
  };

  const createNewCycle = async (id, date) => {
    const docRef = doc(db, 'dispositionsSortedEmployees', id);
    const docSnap = await updateDoc(docRef, { [date]: docSchema })
      .then(() => {
        return docSchema;
      })
      .catch((error) => {
        throw error;
      });
    return docSnap;
  };

  const updateDispoSendInfo = async (currentUser) => {
    const docRef = doc(db, 'statesApp', 'dispoSendInfo');
    const docSnap = await updateDoc(docRef, {
      [currentUser.id]: {
        info: {
          email: currentUser.email,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
        },
        status: true,
      },
    }).catch((error) => {
      throw error;
    });
    return docSnap;
  };

  const updateDisposition = async (id, date, values) => {
    const docRef = doc(db, 'dispositionsSortedEmployees', id);
    const docSnap = await updateDoc(docRef, { [date]: values }).catch((error) => {
      throw error;
    });
    return docSnap;
  };

  return {
    getEmployeeDispositions,
    createNewCycle,
    updateDisposition,
    updateDispoSendInfo,
  };
};
