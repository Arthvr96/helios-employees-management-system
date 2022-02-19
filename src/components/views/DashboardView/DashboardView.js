import React from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import NewCycleWindow from 'components/organisms/NewCycleWindow/NewCycleWindow';
import ActiveCycleWindows from 'components/organisms/ActiveCycleWindows/ActiveCycleWindows';
import DispoSendBlockedWindow from 'components/organisms/DispoSendBlockedWindow/DispoSendBlockedWindow';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';

const DashBoard = () => {
  const { appState } = useGlobalState();

  return (
    <ViewTemplate>
      {appState.state === 'nonActive' ? <NewCycleWindow /> : null}
      {appState.state === 'active' ? <ActiveCycleWindows /> : null}
      {appState.state === 'blocked' ? <DispoSendBlockedWindow /> : null}
    </ViewTemplate>
  );
};

export default DashBoard;
