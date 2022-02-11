import React from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import NewCycleWindow from 'components/organisms/NewCycleWindow/NewCycleWindow';
import ActiveCycleWindows from 'components/organisms/ActiveCycleWindows/ActiveCycleWindows';
import DyspoSendBlockedWindow from 'components/organisms/DyspoSendBlockedWindow/DyspoSendBlockedWindow';
import { useAuth } from 'providers/AuthProvider/AuthProvider';

const DashBoard = () => {
  const { appState } = useAuth();

  return (
    <ViewTemplate>
      {appState.state === 'nonActive' ? <NewCycleWindow /> : null}
      {appState.state === 'active' ? <ActiveCycleWindows /> : null}
      {appState.state === 'blocked' ? <DyspoSendBlockedWindow /> : null}
    </ViewTemplate>
  );
};

export default DashBoard;
