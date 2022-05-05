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
  __cleanupGraphsArchive__,
} from './onChangeStateFunctions';

const __runOnNewCycle__ = (values, dispoSendInfo) => {
  const cycleDate = `${values.date1}-${values.date2}`;
  return __resetDispoSendList__(dispoSendInfo)
    .then(() => __createNewCycleInDispoSortedEmployees__(cycleDate))
    .then(() => __archiveActualDispo__(cycleDate, values.workDays));
};
const __runOnBlockSendingDispo__ = (appState) => {
  const date = `${appState.date1}-${appState.date2}`;
  return __archiveActualDispo__(date, appState.workDays);
};
const __runOnEndCycle__ = () => {
  return __cleanupDispoEmployees__()
    .then(() => __cleanupDispoCycles__())
    .then(() => __cleanupGraphsArchive__());
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
      workDays: values.workDays,
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
      ...appState,
      date1: '',
      date2: '',
      lastDate1: appState.date1,
      lastDate2: appState.date2,
      marathon: {},
      workDays: {},
      state: 'nonActive',
    };
  }

  if (data) {
    return __handleSetDoc__(pathName, segments.cycleState, data).then(() => {
      if (target === 'newCycle') {
        return __runOnNewCycle__(values, dispoSendInfo);
      }
      if (target === 'blockSendingDisposition') {
        return __runOnBlockSendingDispo__(appState);
      }
      if (target === 'endCycle') {
        return __runOnEndCycle__();
      }
      return new Promise((resolve) => {
        resolve();
      });
    });
  }
  return new Promise((resolve) => {
    resolve();
  });
};

const updateCycleState = (data) => {
  const { pathName, segments } = firestoreConstants.paths.stateApp;
  return __handleUpdateDoc__(pathName, segments.cycleState, data);
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
  updateCycleState,
};
