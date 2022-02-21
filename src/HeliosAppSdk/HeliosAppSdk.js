import { cycleStateManagement } from 'HeliosAppSdk/dist/cycleStateManagement/cycleStateManagement';
import firestoreConstants from './dist/firestoreConstants';
import { authFunctions } from './dist/auth';
import { firestoreRequest } from './dist/firestoreRequest';

const heliosAppSdk = {
  firestoreConstants,
  auth: authFunctions,
  firestore: firestoreRequest,
  appState: cycleStateManagement,
};

export default heliosAppSdk;
