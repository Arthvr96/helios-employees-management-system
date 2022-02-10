import React from 'react';
import { Route } from 'react-router-dom';
import UserTemplateNavigation from 'components/templates/UserTemplateNavigation/UserTemplateNavigation';
import DispositionUserView from 'components/views/DispositionUserView/DispositionUserView';
import ScheduleUserView from 'components/views/ScheduleUserView/ScheduleUserView';
import HoursUserView from 'components/views/HoursUserView/HoursUserView';

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
