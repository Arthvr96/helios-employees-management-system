import React from 'react';
import { Route } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import DashboardView from 'components/views/DashboardView/DashboardView';
import DispoAndScheduleView from 'components/views/DispoAndScheduleView/DispoAndScheduleView';
import ScheduleGeneratorView from 'components/views/ScheduleGeneratorView/ScheduleGeneratorView';
import EmployeesView from 'components/views/EmployeesView/EmployessView';
import OLDAdminStateProvider from 'providers/OLDAdminStateProvider/OLDAdminStateProvider';
import AdminStateProvider from 'providers/AuthProvider/AdminStateProvider/AdminStateProvider';

const AdminPanel = () => {
  return (
    <MainTemplate>
      <OLDAdminStateProvider>
        <AdminStateProvider>
          <Route exact path="/admin/dashboard" component={DashboardView} />
          <Route exact path="/admin/dispoSchedule" component={DispoAndScheduleView} />
          <Route exact path="/admin/scheduleGenerator" component={ScheduleGeneratorView} />
          <Route exact path="/admin/employeesView" component={EmployeesView} />
        </AdminStateProvider>
      </OLDAdminStateProvider>
    </MainTemplate>
  );
};

export default AdminPanel;
