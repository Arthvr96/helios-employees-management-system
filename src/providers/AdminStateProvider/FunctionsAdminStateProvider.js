import {
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';

const handleClearDispoSendList = (dispoSendInfo) => {
  const request = async () => {
    await getDoc(doc(db, 'statesApp', 'dispoSendInfo'))
      .then((docItem) => {
        const obj = { ...docItem.data() };
        for (const key in dispoSendInfo) {
          if ({}.hasOwnProperty.call(dispoSendInfo, key)) {
            obj[key].status = false;
          }
        }
        return setDoc(doc(db, 'statesApp', 'dispoSendInfo'), obj).catch((error) => {
          throw error;
        });
      })
      .catch((error) => {
        throw error;
      });
  };
  request().catch((error) => {
    window.alert(error.code);
  });
};

const createNewCycleInDispoSortedEmployees = (dateCycle) => {
  const request = async () => {
    const q = query(collection(db, 'dispositionsSortedEmployees'));
    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
          updateDoc(doc(db, 'dispositionsSortedEmployees', docSnap.id), {
            [dateCycle]: {},
          }).catch((error) => {
            throw error;
          });
        });
      })
      .catch((error) => {
        throw error;
      });
  };
  request().catch((error) => window.alert(error.code));
};

const archiveActualDispo = (appState) => {
  const request = async () => {
    const date = `${appState.date1}-${appState.date2}`;
    const q = query(collection(db, 'dispositionsSortedEmployees'));
    await getDocs(q).then((querySnapshot) => {
      const data = {};
      querySnapshot.forEach((el) => {
        data[el.id] = {
          disposition: el.data()[date],
          alias: el.data().alias,
        };
      });
      setDoc(doc(db, 'dispositionsSortedByCycles', date), data);
    });
  };
  request().catch((error) => {
    window.alert(error.code);
  });
};

const deleteOldestCycleInDispoSortedEmployees = () => {
  const request = async () => {
    const q = query(collection(db, 'dispositionsSortedEmployees'));
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((el) => {
        const cycles = Object.keys(el.data()).filter((a) => a !== 'alias');

        if (cycles.length > 4) {
          cycles.sort((a, b) => {
            const date1 = new Date(a.slice(0, 10));
            const date2 = new Date(b.slice(0, 10));

            return date2 - date1;
          });
          const data = {};
          for (const key in el.data()) {
            if ({}.hasOwnProperty.call(el.data(), key)) {
              if (key !== cycles[cycles.length - 1]) {
                data[key] = el.data()[key];
              }
            }
          }
          setDoc(doc(db, 'dispositionsSortedEmployees', el.id), data).catch((error) => {
            throw error;
          });
        }
      });
    });
  };
  request().catch((error) => {
    window.alert(error.code);
  });
};

const deleteOldestCycleInDispoSortedByCycle = () => {
  const request = async () => {
    const q = query(collection(db, 'dispositionsSortedByCycles'));
    await getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size > 16) {
        const cycles = [];
        querySnapshot.forEach((el) => {
          cycles.push(el.id);
        });
        cycles.sort((a, b) => {
          const date1 = new Date(a.slice(0, 10));
          const date2 = new Date(b.slice(0, 10));

          return date2 - date1;
        });
        deleteDoc(doc(db, 'dispositionsSortedByCycles', cycles[cycles.length - 1]));
      }
    });
  };
  request().catch((error) => {
    window.alert(error.code);
  });
};

export const functionsAdminStateProvider = () => {
  return {
    handleClearDispoSendList,
    createNewCycleInDispoSortedEmployees,
    archiveActualDispo,
    deleteOldestCycleInDispoSortedEmployees,
    deleteOldestCycleInDispoSortedByCycle,
  };
};
