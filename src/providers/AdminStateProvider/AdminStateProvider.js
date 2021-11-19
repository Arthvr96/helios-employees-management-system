import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { employesDyspoOnlyRead } from 'data/employesDyspoOnlyRead';

export const AdminStateContext = createContext({});

const AdminStateProvider = ({ children }) => {
  const [employesDyspo, setEmployesDyspo] = useState([]);

  const getEmployesDyspo = () => {
    setEmployesDyspo(employesDyspoOnlyRead);
  };

  return (
    <AdminStateContext.Provider value={{ employesDyspo, getEmployesDyspo }}>
      {children}
    </AdminStateContext.Provider>
  );
};

export default AdminStateProvider;

AdminStateProvider.propTypes = {
  children: PropTypes.node,
};
