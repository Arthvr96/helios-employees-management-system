import { cycleStateManagement } from 'HeliosAppSdk/dist/cycleStateManagement/cycleStateManagement';
import { authFunctions } from 'HeliosAppSdk/dist/auth/auth';
import firestoreConstants from 'HeliosAppSdk/dist/firestoreConstatns/firestoreConstants';
import { firestoreRequest } from 'HeliosAppSdk/dist/firestoreRequest/firestoreRequest';

const heliosAppSdk = {
  firestoreConstants,
  auth: authFunctions,
  firestore: firestoreRequest,
  appState: cycleStateManagement,
};

export default heliosAppSdk;
