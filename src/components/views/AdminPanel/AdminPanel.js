import React from 'react';
import { Route } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import DashboardView from 'components/views/DashboardView/DashboardView';
import SchemaView from 'components/views/SchemaView/SchemaView';
import GraphGeneratorView from 'components/views/GraphGeneratorView/GraphGeneratorView';
import EmployeesView from 'components/views/EmployeesView/EmployessView';
import AdminStateProvider from 'providers/AdminStateProvider/AdminStateProvider';

const AdminPanel = () => {
  return (
    <MainTemplate>
      <AdminStateProvider>
        <Route exact path="/admin/dashboard" component={DashboardView} />
        <Route exact path="/admin/schemaView" component={SchemaView} />
        <Route exact path="/admin/graphGeneratorView" component={GraphGeneratorView} />
        <Route exact path="/admin/employeesView" component={EmployeesView} />
      </AdminStateProvider>
    </MainTemplate>
  );
};

export default AdminPanel;
