import { dispoPlaceholder } from '../helpers/helpers';
import {
  __handleGetDoc__,
  __handleGetDocs__,
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

const getEmployeeDisposition = (cycleId) => {
  // w starej wersji funkcj zwracany byl respond.data(). teraz sam respond. !!!!!!!

  const { dispositionsEmployees } = firestoreConstants.paths;
  return __handleGetDoc__(dispositionsEmployees, cycleId);
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

export const firestoreRequest = {
  getUserInfo,
  getEmployeesList,
  getEmployeeDisposition,
  setDefaultEmployeeDisposition,
  updateDispoSendInfo,
  updateEmployeeDisposition,
};
