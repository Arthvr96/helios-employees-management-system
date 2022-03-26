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
  return __handleGetDoc__(pathName, segments.dispoSendInfo).then((docItem) => {
    const obj = { ...docItem.data() };
    for (const key in dispoSendInfo) {
      if ({}.hasOwnProperty.call(dispoSendInfo, key)) {
        obj[key].status = false;
      }
    }
    return __handleSetDoc__(pathName, segments.dispoSendInfo, obj);
  });
};

export const __createNewCycleInDispoSortedEmployees__ = (dateCycle) => {
  const { dispositionsEmployees } = firestoreConstants.paths;

  const asyncFunc = (id, cb) => {
    __handleUpdateDoc__(dispositionsEmployees, id, {
      [dateCycle]: {},
    })
      .then(() => {
        cb();
      })
      .catch((error) => alert(error.code));
  };

  return __handleGetDocs__(dispositionsEmployees).then((querySnapshot) => {
    const arr = [];
    querySnapshot.forEach((docSnap) => {
      arr.push(docSnap.id);
    });
    const respond = arr.map((id) => {
      return new Promise((resolve) => {
        asyncFunc(id, resolve);
      });
    });
    return Promise.all(respond);
  });
};

export const __archiveActualDispo__ = (date) => {
  const { dispositionsEmployees, dispositionsCycles, users } = firestoreConstants.paths;
  return __handleGetDocs__(users, 'role', '==', 'user').then((respond) => {
    const usersList = {};
    respond.forEach((user) => {
      usersList[user.id] = {
        ...user.data(),
      };
    });
    return __handleGetDocs__(dispositionsEmployees).then((querySnapshot) => {
      const data = {};

      querySnapshot.forEach((el) => {
        data[el.id] = {
          disposition: el.data()[date].disposition || {},
          message: el.data()[date].message || '',
          alias: el.data().alias,
          coffee: usersList[el.id].workplaces.coffee,
        };
      });
      return __handleSetDoc__(dispositionsCycles, date, data);
    });
  });
};

export const __cleanupDispoEmployees__ = () => {
  const { dispositionsEmployees } = firestoreConstants.paths;

  const asyncFunc = (id, data, cb) => {
    __handleSetDoc__(dispositionsEmployees, id, data)
      .then(() => {
        cb();
      })
      .catch((error) => alert(error.code));
  };

  return __handleGetDocs__(dispositionsEmployees).then((querySnapshot) => {
    const arr = [];
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
        arr.push({ id: el.id, data });
      }
    });
    const respond = arr.map((el) => {
      return new Promise((resolve) => {
        asyncFunc(el.id, el.data, resolve);
      });
    });
    return Promise.all(respond);
  });
};

export const __cleanupDispoCycles__ = () => {
  const { dispositionsCycles } = firestoreConstants.paths;

  const asyncFunc = (querySnapshot) => {
    const cycles = [];
    querySnapshot.forEach((el) => {
      cycles.push(el.id);
    });
    cycles.sort((a, b) => {
      const date1 = new Date(a.slice(0, 10));
      const date2 = new Date(b.slice(0, 10));

      return date2 - date1;
    });
    return __handleDeleteDoc__(dispositionsCycles, cycles[cycles.length - 1]);
  };
  return __handleGetDocs__(dispositionsCycles).then((querySnapshot) => {
    return new Promise((resolve) => {
      if (querySnapshot.size > 14) {
        resolve(asyncFunc(querySnapshot));
      } else {
        resolve();
      }
    });
  });
};
