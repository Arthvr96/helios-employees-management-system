import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import firestoreConstants from 'HeliosAppSdk/dist/firestoreConstants';
import { __handleSetDoc__ } from 'HeliosAppSdk/dist/firestoreFunctionsPrivate';
import { __resetDispoSendList__ } from 'HeliosAppSdk/dist/cycleStateManagement/onChangeStateFunctions';

const __runOnNewCycle__ = (values, dispoSendInfo) => {
  const cycleDate = `${values.date1}-${values.date2}`;
  __resetDispoSendList__(dispoSendInfo);
};
const __runOnBlockSendingDispo__ = () => {};
const __runOnEndCycle__ = () => {};

const changeStateApp = async (target, values, appState, dispoSendInfo) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  let data;
  if (target === 'newCycle') {
    data = {
      ...appState,
      date1: values.date1,
      date2: values.date2,
      state: 'active',
    };
  }
  if (target === 'blockSendingDisposition') {
    data = {
      ...appState,
      state: 'blocked',
    };
  }
  if (target === 'endCycle') {
    data = {
      date1: '',
      date2: '',
      lastDate1: appState.date1,
      lastDate2: appState.date2,
      state: 'nonActive',
    };
  }

  if (data) {
    __handleSetDoc__(pathName, segments.dispoSendInfo, data).then(() => {
      if (target === 'newCycle') {
        __runOnNewCycle__(values, dispoSendInfo);
      }
      if (target === 'blockSendingDisposition') {
        __runOnBlockSendingDispo__();
      }
      if (target === 'blockSendingDisposition') {
        __runOnEndCycle__();
      }
    });
  }
};

const cycleStateObserver = (setAppState) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  return onSnapshot(doc(db, pathName, segments.cycleState), (item) => {
    setAppState({ ...item.data() });
    // This localStorage reset is necessary. Look doc.
    if (item.data().state === 'blocked') {
      localStorage.removeItem('options');
      localStorage.removeItem('dispoRespond');
    }
  });
};

const dispoSendInfoObserver = (setDispoSendInfo) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  return onSnapshot(doc(db, pathName, segments.dispoSendInfo), (item) => {
    setDispoSendInfo({ ...item.data() });
  });
};

export const cycleStateManagement = {
  dispoSendInfoObserver,
  cycleStateObserver,
  changeStateApp,
};
