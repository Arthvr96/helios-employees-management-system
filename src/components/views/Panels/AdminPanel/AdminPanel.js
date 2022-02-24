import React from 'react';
import { Route } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import DashboardView from 'components/views/AdminViews/DashboardView/DashboardView';
import DispoAndScheduleView from 'components/views/AdminViews/DispoAndScheduleView/DispoAndScheduleView';
import ScheduleGeneratorView from 'components/views/AdminViews/ScheduleGeneratorView/ScheduleGeneratorView';
import EmployeesView from 'components/views/AdminViews/EmployeesView/EmployessView';

const AdminPanel = () => {
  return (
    <MainTemplate>
      <Route exact path="/admin/dashboard" component={DashboardView} />
      <Route exact path="/admin/dispoSchedule" component={DispoAndScheduleView} />
      <Route exact path="/admin/scheduleGenerator" component={ScheduleGeneratorView} />
      <Route exact path="/admin/employeesView" component={EmployeesView} />
    </MainTemplate>
  );
};

export default AdminPanel;
