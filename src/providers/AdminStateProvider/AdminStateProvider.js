import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cmsResponseEmployeesDispo } from 'data/cmsResponseEmployeesDispo';
import { cmsResponseShiftsSchema } from 'data/cmsResponseShiftsSchema';
import { cmsResponseEmployeesInfo } from 'data/cmsResponseEmployeesInfo';
import { getGraph } from 'generatorGraph/getGraph';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import { useAuth } from 'providers/AuthProvider/AuthProvider';

export const AdminStateContext = createContext({ cycleState: '', changeCycle: () => {} });

const AdminStateProvider = ({ children }) => {
  // Don't touch, this state has to be in admin state provider
  const [dispoSendInfo, setDispoSendInfo] = useState({});
  // TODO refactor in future
  const [employeesDispo, setEmployeesDispo] = useState([]);
  const [shiftsSchema, setshiftsSchema] = useState([]);
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [graph, setGraph] = useState({});
  const [cycleState, setCycle] = useState('active');
  const { appState, authAdmin } = useAuth();

  const handleClearDispoSendList = () => {
    return getDoc(doc(db, 'statesApp', 'dispoSendInfo')).then((docItem) => {
      const obj = { ...docItem.data() };
      for (const key in dispoSendInfo) {
        if ({}.hasOwnProperty.call(dispoSendInfo, key)) {
          obj[key].status = false;
        }
      }
      return setDoc(doc(db, 'statesApp', 'dispoSendInfo'), obj).catch((error) => {
        throw error;
      });
    });
  };

  useEffect(() => {
    if (appState.state === 'active') {
      handleClearDispoSendList().catch((error) => {
        window.alert(error.code);
      });
    }
  }, [appState]);

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

  const getDataUpdate = () => {
    const copyOfCmsResponseEmployeesDispo = [];

    cmsResponseEmployeesDispo.forEach((employee) => {
      copyOfCmsResponseEmployeesDispo.push({ ...employee });
    });
    setEmployeesDispo([...copyOfCmsResponseEmployeesDispo]);
    setshiftsSchema({ ...cmsResponseShiftsSchema });
    setEmployeesInfo([...cmsResponseEmployeesInfo]);
  };

  const handleGenerateGraph = () => {
    getDataUpdate();
    const graphHandler = getGraph(employeesDispo, shiftsSchema, employeesInfo);
    setGraph(graphHandler);
  };

  const handleClearState = () => {
    getDataUpdate();
    setGraph({});
  };

  const changeCycle = (option) => {
    if (option === 'new' || option === 'active' || option === 'blocked') {
      setCycle(option);
    }
  };

  return (
    <AdminStateContext.Provider
      value={{
        graph,
        employeesDispo,
        employeesInfo,
        shiftsSchema,
        cycleState,
        dispoSendInfo,
        getDataUpdate,
        handleGenerateGraph,
        handleClearState,
        changeCycle,
      }}
    >
      {children}
    </AdminStateContext.Provider>
  );
};

export default AdminStateProvider;

AdminStateProvider.propTypes = {
  children: PropTypes.node,
};
