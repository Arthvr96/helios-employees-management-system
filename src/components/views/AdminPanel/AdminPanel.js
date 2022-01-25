import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import DashboardView from 'components/views/DashboardView/DashboardView';
import SchemaView from 'components/views/SchemaView/SchemaView';
import GraphGeneratorView from 'components/views/GraphGeneratorView/GraphGeneratorView';
import EmployeesView from 'components/views/EmployeesView/EmployessView';

const AdminPanel = () => {
  return (
    <MainTemplate>
      <Switch>
        <Route path="/dashboard" component={DashboardView} />
        <Route path="/schemaView" component={SchemaView} />
        <Route path="/graphGeneratorView" component={GraphGeneratorView} />
        <Route path="/employeesView" component={EmployeesView} />
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </MainTemplate>
  );
};

export default AdminPanel;
