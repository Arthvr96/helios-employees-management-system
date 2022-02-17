import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { functionsAdminStateProvider } from 'providers/AuthProvider/AdminStateProvider/FunctionsAdminStateProvider';

const AdminContext = React.createContext({});

export const useAdminContext = () => {
  return useContext(AdminContext);
};

const AdminStateProvider = ({ children }) => {
  const { appState, authAdmin } = useAuth();
  const [dispoSendInfo, setDispoSendInfo] = useState({});
  const {
    handleClearDispoSendList,
    createNewCycleInDispoSortedEmployees,
    archiveActualDispo,
    deleteOldestCycleInDispoSortedEmployees,
    deleteOldestCycleInDispoSortedByCycle,
  } = functionsAdminStateProvider();

  const eventSwitchStateToActive = (values) => {
    // functions which have to run when stateApp switch to active

    const cycleDate = `${values.date1}-${values.date2}`;

    handleClearDispoSendList(dispoSendInfo);
    createNewCycleInDispoSortedEmployees(cycleDate);
  };
  const eventSwitchStateToBlocked = () => {
    // functions which have to run when stateApp switch to blocked

    archiveActualDispo(appState);
  };
  const eventSwitchStateToNonActive = () => {
    // functions which have to run when stateApp switch to nonActive

    deleteOldestCycleInDispoSortedEmployees();
    deleteOldestCycleInDispoSortedByCycle();
  };

  const handleChangeCycleState = async (target, values) => {
    const updateCycleState = (data) => {
      return setDoc(doc(db, 'statesApp', 'cycleState'), data);
    };

    if (target === 'newCycle') {
      const data = {
        ...appState,
        date1: values.date1,
        date2: values.date2,
        state: 'active',
      };
      await updateCycleState(data)
        .then(() => {
          eventSwitchStateToActive(values);
        })
        .catch((error) => {
          window.alert(error.code);
        });
    }

    if (target === 'blockSendingDisposition') {
      const data = {
        ...appState,
        state: 'blocked',
      };
      await updateCycleState(data)
        .then(() => {
          eventSwitchStateToBlocked();
        })
        .catch((error) => {
          window.alert(error.code);
        });
    }
    if (target === 'endCycle') {
      const data = {
        date1: '',
        date2: '',
        lastDate1: appState.date1,
        lastDate2: appState.date2,
        state: 'nonActive',
      };
      await updateCycleState(data)
        .then(() => {
          eventSwitchStateToNonActive();
        })
        .catch((error) => {
          window.alert(error.code);
        });
    }
    return null;
  };

  useEffect(() => {
    let unsub = () => {};

    if (authAdmin) {
      unsub = onSnapshot(doc(db, 'statesApp', 'dispoSendInfo'), (item) => {
        setDispoSendInfo({ ...item.data() });
      });
    }

    return () => {
      unsub();
    };
  }, [authAdmin]);

  const values = { dispoSendInfo, handleChangeCycleState };

  return <AdminContext.Provider value={values}>{children}</AdminContext.Provider>;
};

export default AdminStateProvider;

AdminStateProvider.propTypes = {
  children: PropTypes.node,
};
