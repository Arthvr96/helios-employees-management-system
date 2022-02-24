import React from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import NewCycleWindow from 'components/organisms/NewCycleWindow/NewCycleWindow';
import ActiveCycleWindows from 'components/organisms/ActiveCycleWindows/ActiveCycleWindows';
import DispoSendBlockedWindow from 'components/organisms/DispoSendBlockedWindow/DispoSendBlockedWindow';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { Button } from 'components/atoms/Button/Button';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';

const DashBoard = () => {
  const { appState } = useGlobalState();
  const { createUser } = HeliosAppSdk.auth;

  return (
    <ViewTemplate>
      {appState.state === 'nonActive' ? <NewCycleWindow /> : null}
      {appState.state === 'active' ? <ActiveCycleWindows /> : null}
      {appState.state === 'blocked' ? <DispoSendBlockedWindow /> : null}
      <Button type="button" onClick={() => createUser({ alias: 'Ari Maj' }, {}, false)}>
        OnClick
      </Button>
    </ViewTemplate>
  );
};

export default DashBoard;
