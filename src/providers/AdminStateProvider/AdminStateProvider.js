import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { cmsResponseEmployeesDispo } from 'data/cmsResponseEmployeesDispo';
import { cmsResponseShiftsSchema } from 'data/cmsResponseShiftsSchema';
import { cmsResponseEmployeesInfo } from 'data/cmsResponseEmployeesInfo';
import { getGraph } from 'generatorGraph/getGraph';

export const AdminStateContext = createContext({});

const AdminStateProvider = ({ children }) => {
  const [employeesDispo, setEmployeesDispo] = useState([]);
  const [shiftsSchema, setshiftsSchema] = useState([]);
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [graph, setGraph] = useState({});

  const getDataUpdate = () => {
    const copyOfCmsResponseEmployeesDispo = [];

    cmsResponseEmployeesDispo.forEach((employee) => {
      copyOfCmsResponseEmployeesDispo.push({ ...employee });
    });
    setEmployeesDispo([...copyOfCmsResponseEmployeesDispo]);
    setshiftsSchema({ ...cmsResponseShiftsSchema });
    setEmployeesInfo([...cmsResponseEmployeesInfo]);

    if (employeesDispo[0]) {
      console.log(employeesDispo[5]);
    }
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

  return (
    <AdminStateContext.Provider
      value={{
        graph,
        employeesDispo,
        employeesInfo,
        shiftsSchema,
        getDataUpdate,
        handleGenerateGraph,
        handleClearState,
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
