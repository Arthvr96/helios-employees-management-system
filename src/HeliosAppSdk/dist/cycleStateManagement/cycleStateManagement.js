import firestoreConstants from 'HeliosAppSdk/dist/firestoreConstatns/firestoreConstants';
import {
  __handleOnSnapshot__,
  __handleSetDoc__,
  __handleUpdateDoc__,
} from 'HeliosAppSdk/dist/firestoreFunctionsPrivate/firestoreFunctionsPrivate';
import {
  __resetDispoSendList__,
  __createNewCycleInDispoSortedEmployees__,
  __archiveActualDispo__,
  __cleanupDispoEmployees__,
  __cleanupDispoCycles__,
} from './onChangeStateFunctions';

const __runOnNewCycle__ = (values, dispoSendInfo) => {
  const cycleDate = `${values.date1}-${values.date2}`;
  __resetDispoSendList__(dispoSendInfo);
  __createNewCycleInDispoSortedEmployees__(cycleDate);
};
const __runOnBlockSendingDispo__ = (appState) => {
  const date = `${appState.date1}-${appState.date2}`;
  __archiveActualDispo__(date);
};
const __runOnEndCycle__ = () => {
  __cleanupDispoEmployees__();
  __cleanupDispoCycles__();
};

const changeStateApp = async (target, values, appState, dispoSendInfo) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  let data;
  if (target === 'newCycle') {
    data = {
      ...appState,
      date1: values.date1,
      date2: values.date2,
      marathon: values.marathon,
      state: 'active',
    };
  }
  if (target === 'blockSendingDisposition') {
    data = {
      ...appState,
      state: 'blocked',
    };
  }
  if (target === 'backToActive') {
    data = {
      ...appState,
      state: 'active',
    };
  }
  if (target === 'endCycle') {
    data = {
      date1: '',
      date2: '',
      lastDate1: appState.date1,
      lastDate2: appState.date2,
      marathon: {},
      state: 'nonActive',
    };
  }

  if (data) {
    return __handleSetDoc__(pathName, segments.cycleState, data).then(() => {
      if (target === 'newCycle') {
        __runOnNewCycle__(values, dispoSendInfo);
      }
      if (target === 'blockSendingDisposition') {
        __runOnBlockSendingDispo__(appState);
      }
      if (target === 'blockSendingDisposition') {
        __runOnEndCycle__();
      }
    });
  }
  return null;
};

const updateSettings = (data) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  return __handleUpdateDoc__(pathName, segments.settings, data);
};

const cycleStateObserver = (setAppState) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  return __handleOnSnapshot__(pathName, segments.cycleState, (item) => {
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
  return __handleOnSnapshot__(pathName, segments.dispoSendInfo, (item) => {
    setDispoSendInfo({ ...item.data() });
  });
};

const settingsObserver = (setSettings) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  return __handleOnSnapshot__(pathName, segments.settings, (item) => {
    setSettings({ ...item.data() });
  });
};

export const cycleStateManagement = {
  dispoSendInfoObserver,
  cycleStateObserver,
  settingsObserver,
  changeStateApp,
  updateSettings,
};
