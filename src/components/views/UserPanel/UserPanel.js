import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import UserTemplateNavigation from 'components/templates/UserTemplateNavigation/UserTemplateNavigation';
import DispositionUserView from 'components/views/DispositionUserView/DispositionUserView';
import ScheduleUserView from 'components/views/ScheduleUserView/ScheduleUserView';
import HoursUserView from 'components/views/HoursUserView/HoursUserView';

const UserPanel = () => {
  useEffect(() => {
    const viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.setAttribute('content', 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0');
  }, []);

  return (
    <UserTemplateNavigation>
      <Route exact path="/user/disposition" component={DispositionUserView} />
      <Route exact path="/user/schedule" component={ScheduleUserView} />
      <Route exact path="/user/hours" component={HoursUserView} />
    </UserTemplateNavigation>
  );
};

export default UserPanel;
