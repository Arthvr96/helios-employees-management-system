import React from 'react';
import { Route } from 'react-router-dom';
import UserTemplateNavigation from 'components/templates/UserTemplateNavigation/UserTemplateNavigation';
import DispositionUserView from 'components/views/UserViews/DispositionUserView/DispositionUserView';
import ScheduleUserView from 'components/views/UserViews/ScheduleUserView/ScheduleUserView';
import ArchiveDispositionsView from 'components/views/UserViews/ArchiveDispositionsView/ArchiveDispositionsView';
import { userUpdatesAppInfo } from 'mocks/updatesAppInfo';
import UpdateInfoPopup from 'components/organisms/UpdateInfoPopup/UpdateInfoPopup';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { StyledTitle } from './UserPanel.style';

// TODO: Utworzyc change log dla users i dostosowac updateinfopopup

const UserRoot = () => {
  const { currentUser, appState } = useGlobalState();

  return (
    <>
      <UpdateInfoPopup
        cookieName="lastUpdateUser"
        lastUpdate={appState.lastUpdateUser}
        info={userUpdatesAppInfo}
      />
      <ViewTemplate>
        <CardTemplate>
          <StyledTitle>
            Witaj {currentUser.firstName} {currentUser.lastName}
          </StyledTitle>
        </CardTemplate>
      </ViewTemplate>
    </>
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
