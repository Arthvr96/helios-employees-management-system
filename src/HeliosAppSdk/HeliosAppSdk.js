import { cycleStateManagement } from 'HeliosAppSdk/dist/cycleStateManagement/cycleStateManagement';
import { authFunctions } from 'HeliosAppSdk/dist/auth/auth';
import firestoreConstants from 'HeliosAppSdk/dist/firestoreConstatns/firestoreConstants';
import { firestoreRequest } from 'HeliosAppSdk/dist/firestoreRequest/firestoreRequest';
import { emailProvider } from 'HeliosAppSdk/dist/emailProvider/emailProvider';
import { __firestoreFunctionsPrivate__ } from 'HeliosAppSdk/dist/firestoreFunctionsPrivate/firestoreFunctionsPrivate';
import { __helpers__ } from 'HeliosAppSdk/dist/helpers/helpers';
import { info } from 'HeliosAppSdk/dist/appInfo';

const heliosAppSdk = {
  firestoreConstants,
  auth: authFunctions,
  firestore: firestoreRequest,
  appState: cycleStateManagement,
  emailProvider,
  __firestoreFunctionsPrivate__,
  __helpers__,
  appInfo: info,
};

export default heliosAppSdk;
