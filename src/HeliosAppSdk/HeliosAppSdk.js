import { cycleStateManagement } from 'HeliosAppSdk/dist/cycleStateManagement/cycleStateManagement';
import { authFunctions } from 'HeliosAppSdk/dist/auth/auth';
import firestoreConstants from 'HeliosAppSdk/dist/firestoreConstatns/firestoreConstants';
import { firestoreRequest } from 'HeliosAppSdk/dist/firestoreRequest/firestoreRequest';
import { __helpersFunctions__ } from 'HeliosAppSdk/dist/firestoreFunctionsPrivate/firestoreFunctionsPrivate';

const heliosAppSdk = {
  firestoreConstants,
  auth: authFunctions,
  firestore: firestoreRequest,
  appState: cycleStateManagement,
  __helpers__: __helpersFunctions__,
};

export default heliosAppSdk;
