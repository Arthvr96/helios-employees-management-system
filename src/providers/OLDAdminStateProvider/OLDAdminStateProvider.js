import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { cmsResponseEmployeesDispo } from 'data/cmsResponseEmployeesDispo';
import { cmsResponseShiftsSchema } from 'data/cmsResponseShiftsSchema';
import { cmsResponseEmployeesInfo } from 'data/cmsResponseEmployeesInfo';
import { getGraph } from 'generatorGraph/getGraph';

export const OLDAdminStateContext = createContext({ cycleState: '', changeCycle: () => {} });

const OLDAdminStateProvider = ({ children }) => {
  // TODO refactor in future
  const [employeesDispo, setEmployeesDispo] = useState([]);
  const [shiftsSchema, setshiftsSchema] = useState([]);
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [graph, setGraph] = useState({});
  const [cycleState, setCycle] = useState('active');

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
    <OLDAdminStateContext.Provider
      value={{
        graph,
        employeesDispo,
        employeesInfo,
        shiftsSchema,
        cycleState,
        getDataUpdate,
        handleGenerateGraph,
        handleClearState,
        changeCycle,
      }}
    >
      {children}
    </OLDAdminStateContext.Provider>
  );
};

export default OLDAdminStateProvider;

OLDAdminStateProvider.propTypes = {
  children: PropTypes.node,
};
