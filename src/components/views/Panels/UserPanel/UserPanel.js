import React from 'react';
import { Route } from 'react-router-dom';
import UserTemplateNavigation from 'components/templates/UserTemplateNavigation/UserTemplateNavigation';
import DispositionUserView from 'components/views/UserViews/DispositionUserView/DispositionUserView';
import ScheduleUserView from 'components/views/UserViews/ScheduleUserView/ScheduleUserView';
import ArchiveDispositionsView from 'components/views/UserViews/ArchiveDispositionsView/ArchiveDispositionsView';
import { adminUpdatesAppInfo } from 'mocks/updatesAppInfo';
import UpdateInfoPopup from 'components/organisms/UpdateInfoPopup/UpdateInfoPopup';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';

// TODO: Utworzyc change log dla users i dostosowac updateinfopopup

const UserRoot = () => {
  return (
    <ViewTemplate>
      <UpdateInfoPopup info={adminUpdatesAppInfo} />
    </ViewTemplate>
  );
};

const UserPanel = () => {
  return (
    <UserTemplateNavigation>
      <Route exact path="/user" component={UserRoot} />
      <Route exact path="/user/disposition" component={DispositionUserView} />
      <Route exact path="/user/archive" component={ArchiveDispositionsView} />
      <Route exact path="/user/schedule" component={ScheduleUserView} />
    </UserTemplateNavigation>
  );
};

export default UserPanel;
