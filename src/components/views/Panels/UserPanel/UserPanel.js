import React from 'react';
import { Route } from 'react-router-dom';
import UserTemplateNavigation from 'components/templates/UserTemplateNavigation/UserTemplateNavigation';
import DispositionUserView from 'components/views/UserViews/DispositionUserView/DispositionUserView';
import ScheduleUserView from 'components/views/UserViews/ScheduleUserView/ScheduleUserView';
import HoursUserView from 'components/views/UserViews/HoursUserView/HoursUserView';

const UserPanel = () => {
  return (
    <UserTemplateNavigation>
      <Route exact path="/user/disposition" component={DispositionUserView} />
      <Route exact path="/user/schedule" component={ScheduleUserView} />
      <Route exact path="/user/hours" component={HoursUserView} />
    </UserTemplateNavigation>
  );
};

export default UserPanel;
