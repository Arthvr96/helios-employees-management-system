import React from 'react';
import { Route } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import DashboardView from 'components/views/DashboardView/DashboardView';
import DispoAndScheduleView from 'components/views/DispoAndScheduleView/DispoAndScheduleView';
import ScheduleGeneratorView from 'components/views/ScheduleGeneratorView/ScheduleGeneratorView';
import EmployeesView from 'components/views/EmployeesView/EmployessView';
import AdminStateProvider from 'providers/AdminStateProvider/AdminStateProvider';

const AdminPanel = () => {
  return (
    <MainTemplate>
      <AdminStateProvider>
        <Route exact path="/admin/dashboard" component={DashboardView} />
        <Route exact path="/admin/dispoSchedule" component={DispoAndScheduleView} />
        <Route exact path="/admin/scheduleGenerator" component={ScheduleGeneratorView} />
        <Route exact path="/admin/employeesView" component={EmployeesView} />
      </AdminStateProvider>
    </MainTemplate>
  );
};

export default AdminPanel;
