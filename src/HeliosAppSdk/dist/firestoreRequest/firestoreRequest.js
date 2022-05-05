import { dispoPlaceholder } from '../helpers/helpers';
import {
  __handleDeleteDoc__,
  __handleGetDoc__,
  __handleGetDocs__,
  __handleSetDoc__,
  __handleUpdateDoc__,
} from '../firestoreFunctionsPrivate/firestoreFunctionsPrivate';
import firestoreConstants from '../firestoreConstatns/firestoreConstants';

const getUserInfo = (id) => {
  return __handleGetDoc__(firestoreConstants.paths.users, id);
};

const getEmployeesList = async () => {
  const { paths, roles } = firestoreConstants;
  return await __handleGetDocs__(paths.users, 'role', '==', roles.user);
};

const getEmployeeDisposition = (userId) => {
  const { dispositionsEmployees } = firestoreConstants.paths;
  return __handleGetDoc__(dispositionsEmployees, userId);
};

const getAllDispositions = () => {
  const { dispositionsCycles } = firestoreConstants.paths;
  return __handleGetDocs__(dispositionsCycles);
};

const setDefaultEmployeeDisposition = (id, date) => {
  const { dispositionsEmployees } = firestoreConstants.paths;
  return __handleUpdateDoc__(dispositionsEmployees, id, { [date]: dispoPlaceholder });
};

const updateDispoSendInfo = (currentUser) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  __handleUpdateDoc__(pathName, segments.dispoSendInfo, {
    [currentUser.id]: {
      info: {
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      },
      status: true,
    },
  }).catch((error) => window.alert(error.code));
};

const updateEmployeeDisposition = (id, date, values) => {
  const { dispositionsEmployees } = firestoreConstants.paths;
  return __handleUpdateDoc__(dispositionsEmployees, id, {
    [date]: values,
  });
};

const deleteCycle = (idCycle, appState) => {
  const { dispositionsCycles, dispositionsEmployees, stateApp } = firestoreConstants.paths;

  const handleDeleteCycle = (filterCallback, lastCycle) => {
    return __handleGetDocs__(dispositionsCycles)
      .then((docs) => {
        const cycles = [];
        docs.forEach((el) => {
          cycles.push(el.id);
        });
        const filteredCycle = cycles.filter(filterCallback);
        return new Promise((resolve, reject) => {
          if (filteredCycle.length > 0) {
            resolve(true);
          } else {
            reject(new Error('error-cycles-count'));
          }
        });
      })
      .then(() => {
        return __handleGetDocs__(dispositionsEmployees).then((docsRespond) => {
          docsRespond.forEach((user) => {
            const oldData = user.data();
            const newData = {};
            for (const key in oldData) {
              if ({}.hasOwnProperty.call(oldData, key)) {
                if (key !== idCycle) {
                  newData[key] = oldData[key];
                }
              }
            }
            __handleSetDoc__(dispositionsEmployees, user.id, newData).catch((error) =>
              window.alert(error.code),
            );
          });
          if (lastCycle) {
            __handleGetDocs__(dispositionsCycles).then((cyclesRespond) => {
              const cycles = [];
              cyclesRespond.forEach((cycle) => {
                cycles.push(cycle.id);
              });
              cycles.sort((a, b) => {
                const date1 = new Date(a.slice(0, 10)).getTime();
                const date2 = new Date(b.slice(0, 10)).getTime();

                return date2 - date1;
              });
              __handleUpdateDoc__(stateApp.pathName, stateApp.segments.cycleState, {
                lastDate1: cycles[0].slice(0, 10),
                lastDate2: cycles[0].slice(11, 21),
              }).catch((error) => window.alert(error.code));
            });
          }
          return __handleDeleteDoc__(dispositionsCycles, idCycle);
        });
      });
  };

  if (appState.state === 'nonActive') {
    const date1 = idCycle.slice(0, 10);
    const date2 = idCycle.slice(11, 21);

    if (date1 === appState.lastDate1 && date2 === appState.lastDate2) {
      return handleDeleteCycle((el) => el !== idCycle, true);
    }
    return handleDeleteCycle(
      (el) => el !== idCycle && el !== `${appState.lastDate1}-${appState.lastDate2}`,
      false,
    );
  }
  return null;
};

const getGraphSchemaShapes = () => {
  const { graphSchemaShapes } = firestoreConstants.paths;
  return __handleGetDocs__(graphSchemaShapes);
};

const createGraphSchemaShape = (id, data) => {
  const { graphSchemaShapes } = firestoreConstants.paths;
  return __handleSetDoc__(graphSchemaShapes, id, data);
};

const deleteGraphSchemaShape = (id) => {
  const { graphSchemaShapes } = firestoreConstants.paths;
  return __handleDeleteDoc__(graphSchemaShapes, id);
};

const updateGraphSchemaShape = (id, data) => {
  const { graphSchemaShapes } = firestoreConstants.paths;
  return __handleUpdateDoc__(graphSchemaShapes, id, data);
};

const getGraphArchive = () => {
  const { graphArchive } = firestoreConstants.paths;
  return __handleGetDocs__(graphArchive);
};

const createGraph = (docName, data) => {
  const { graphArchive } = firestoreConstants.paths;
  return __handleSetDoc__(graphArchive, docName, data);
};

export const firestoreRequest = {
  getUserInfo,
  getEmployeesList,
  getEmployeeDisposition,
  setDefaultEmployeeDisposition,
  updateDispoSendInfo,
  updateEmployeeDisposition,
  deleteCycle,
  getGraphSchemaShapes,
  createGraphSchemaShape,
  deleteGraphSchemaShape,
  updateGraphSchemaShape,
  getGraphArchive,
  getAllDispositions,
  createGraph,
};
