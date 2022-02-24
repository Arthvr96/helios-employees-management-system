import firestoreConstants from 'HeliosAppSdk/dist/firestoreConstatns/firestoreConstants';
import {
  __handleDeleteDoc__,
  __handleGetDoc__,
  __handleGetDocs__,
  __handleSetDoc__,
  __handleUpdateDoc__,
} from 'HeliosAppSdk/dist/firestoreFunctionsPrivate/firestoreFunctionsPrivate';

export const __resetDispoSendList__ = (dispoSendInfo) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  __handleGetDoc__(pathName, segments.dispoSendInfo)
    .then((docItem) => {
      const obj = { ...docItem.data() };
      for (const key in dispoSendInfo) {
        if ({}.hasOwnProperty.call(dispoSendInfo, key)) {
          obj[key].status = false;
        }
      }
      return __handleSetDoc__(pathName, segments.dispoSendInfo, obj);
    })
    .catch((error) => window.alert(error.code));
};

export const __createNewCycleInDispoSortedEmployees__ = (dateCycle) => {
  const { dispositionsEmployees } = firestoreConstants.paths;
  __handleGetDocs__(dispositionsEmployees)
    .then((querySnapshot) => {
      querySnapshot.forEach((docSnap) => {
        __handleUpdateDoc__(dispositionsEmployees, docSnap.id, {
          [dateCycle]: {},
        }).catch((error) => {
          throw error;
        });
      });
    })
    .catch((error) => window.alert(error.code));
};

export const __archiveActualDispo__ = (date) => {
  const { dispositionsEmployees, dispositionsCycles } = firestoreConstants.paths;
  __handleGetDocs__(dispositionsEmployees)
    .then((querySnapshot) => {
      const data = {};
      querySnapshot.forEach((el) => {
        data[el.id] = {
          disposition: el.data()[date],
          alias: el.data().alias,
        };
      });
      return __handleSetDoc__(dispositionsCycles, date, data);
    })
    .catch((error) => window.alert(error.code));
};

export const __cleanupDispoEmployees__ = () => {
  const { dispositionsEmployees } = firestoreConstants.paths;
  __handleGetDocs__(dispositionsEmployees)
    .then((querySnapshot) => {
      querySnapshot.forEach((el) => {
        const cycles = Object.keys(el.data()).filter((a) => a !== 'alias');
        if (cycles.length > 4) {
          const data = {};
          cycles.sort((a, b) => {
            const date1 = new Date(a.slice(0, 10));
            const date2 = new Date(b.slice(0, 10));
            return date2 - date1;
          });

          for (const key in el.data()) {
            if ({}.hasOwnProperty.call(el.data(), key)) {
              if (key !== cycles[cycles.length - 1]) {
                data[key] = el.data()[key];
              }
            }
          }
          __handleSetDoc__(dispositionsEmployees, el.id, data).catch((error) => {
            throw error;
          });
        }
      });
    })
    .catch((error) => window.alert(error.code));
};

export const __cleanupDispoCycles__ = () => {
  const { dispositionsCycles } = firestoreConstants.paths;
  __handleGetDocs__(dispositionsCycles)
    .then((querySnapshot) => {
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
        __handleDeleteDoc__(dispositionsCycles, cycles[cycles.length - 1]).catch((error) => {
          throw error;
        });
      }
    })
    .catch((error) => window.alert(error));
};
