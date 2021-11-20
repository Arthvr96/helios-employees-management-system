import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import DashboardView from 'components/views/DashboardView/DashboardView';
import SchemaView from 'components/views/SchemaView/SchemaView';
import GraphGeneratorView from 'components/views/GraphGeneratorView/GraphGeneratorView';
import EmployeesView from 'components/views/EmployeesView/EmployessView';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';

const AdminPanel = () => {
  const { getDataUpdate } = useContext(AdminStateContext);

  useEffect(() => {
    getDataUpdate();
  }, []);

  return (
    <MainTemplate>
      <Switch>
        <Route path="/Dashboard">
          <DashboardView />
        </Route>
        <Route path="/schemaView">
          <SchemaView />
        </Route>
        <Route path="/graphGeneratorView">
          <GraphGeneratorView />
        </Route>
        <Route path="/employeesView">
          <EmployeesView />
        </Route>
      </Switch>
    </MainTemplate>
  );
};

export default AdminPanel;
