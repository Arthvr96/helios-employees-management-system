import React from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import DispositionBlocked from 'components/molecules/DispositionBlocked/DispositionBlocked';
import DispositionActive from 'components/molecules/DispositionActive/DispositionActive';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';

const DispositionUserView = () => {
  const { appState } = useGlobalState();

  return (
    <ViewTemplate justifyContent="center" navMargin="40">
      {appState.state === 'nonActive' || appState.state === 'blocked' ? (
        <DispositionBlocked />
      ) : null}
      {appState.state === 'active' ? <DispositionActive /> : null}
    </ViewTemplate>
  );
};

export default DispositionUserView;
