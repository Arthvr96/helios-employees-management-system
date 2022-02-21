import { __handleGetDoc__, __handleGetDocs__ } from './firestoreFunctionsPrivate';
import firestoreConstants from './firestoreConstants';

const getUserInfo = (id) => {
  return __handleGetDoc__(firestoreConstants.paths.users, id);
};

const getEmployeesList = async () => {
  return await __handleGetDocs__(
    firestoreConstants.paths.users,
    'role',
    '==',
    firestoreConstants.roles.user,
  );
};

export const firestoreRequest = {
  getUserInfo,
  getEmployeesList,
};
