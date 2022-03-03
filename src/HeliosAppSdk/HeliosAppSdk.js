import { cycleStateManagement } from 'HeliosAppSdk/dist/cycleStateManagement/cycleStateManagement';
import { authFunctions } from 'HeliosAppSdk/dist/auth/auth';
import firestoreConstants from 'HeliosAppSdk/dist/firestoreConstatns/firestoreConstants';
import { firestoreRequest } from 'HeliosAppSdk/dist/firestoreRequest/firestoreRequest';
import { __firestoreFunctionsPrivate__ } from 'HeliosAppSdk/dist/firestoreFunctionsPrivate/firestoreFunctionsPrivate';
import { __helpers__ } from 'HeliosAppSdk/dist/helpers/helpers';

const heliosAppSdk = {
  firestoreConstants,
  auth: authFunctions,
  firestore: firestoreRequest,
  appState: cycleStateManagement,
  __firestoreFunctionsPrivate__,
  __helpers__,
};

export default heliosAppSdk;
