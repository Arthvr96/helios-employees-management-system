import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { cmsResponseEmployeesDispo } from 'data/cmsResponseEmployeesDispo';
import { cmsResponseShiftsSchema } from 'data/cmsResponseShiftsSchema';
import { cmsResponseEmployeesInfo } from 'data/cmsResponseEmployeesInfo';

export const AdminStateContext = createContext({});

const AdminStateProvider = ({ children }) => {
  const [employeesDispo, setEmployeesDispo] = useState([]);
  const [shiftsSchema, setshiftsSchema] = useState([]);
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [test, setTest] = useState([
    {
      numberOfDyspo: 0,
    },
    {
      numberOfDyspo: 2,
    },
  ]);

  const getEmployeesDispo = () => {
    setEmployeesDispo(cmsResponseEmployeesDispo);
  };
  const getShiftsSchema = () => {
    setshiftsSchema(cmsResponseShiftsSchema);
  };
  const getEmployeesInfo = () => {
    setEmployeesInfo(cmsResponseEmployeesInfo);
  };

  const getDataUpdate = () => {
    getEmployeesDispo();
    getShiftsSchema();
    getEmployeesInfo();
  };

  return (
    <AdminStateContext.Provider
      value={{
        employeesDispo,
        employeesInfo,
        shiftsSchema,
        getDataUpdate,
        test,
        setTest,
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
