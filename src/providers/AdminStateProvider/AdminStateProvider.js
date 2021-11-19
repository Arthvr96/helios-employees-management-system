import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { employesDyspoOnlyRead } from 'data/employesDyspoOnlyRead';

export const AdminStateContext = createContext({});

const AdminStateProvider = ({ children }) => {
  const [employesDyspo, setEmployesDyspo] = useState(employesDyspoOnlyRead);

  const getEmployesDyspo = () => {
    setEmployesDyspo(employesDyspoOnlyRead);
  };

  const resetEmployesDyspo = () => {
    setEmployesDyspo([]);
  };

  return (
    <AdminStateContext.Provider value={{ employesDyspo, getEmployesDyspo, resetEmployesDyspo }}>
      {children}
    </AdminStateContext.Provider>
  );
};

export default AdminStateProvider;

AdminStateProvider.propTypes = {
  children: PropTypes.node,
};
