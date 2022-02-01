import React from 'react';
import UserTemplateNavigation from 'components/templates/UserTemplateNavigation/UserTemplateNavigation';
import { Redirect, Route } from 'react-router-dom';
import DispositionUserView from 'components/views/DispositionUserView/DispositionUserView';
import ScheduleUserView from 'components/views/ScheduleUserView/ScheduleUserView';
import HoursUserView from 'components/views/HoursUserView/HoursUserView';

const UserPanel = () => {
  return (
    <UserTemplateNavigation>
      <Route path="/disposition" component={DispositionUserView} />
      <Route path="/schedule" component={ScheduleUserView} />
      <Route path="/hours" component={HoursUserView} />
      <Route path="*">
        <Redirect to="/disposition" />
      </Route>
    </UserTemplateNavigation>
  );
};

export default UserPanel;
