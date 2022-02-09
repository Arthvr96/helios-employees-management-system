import React from 'react';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import DispositionBlocked from 'components/molecules/DispositionBlocked/DispositionBlocked';
import DispositionActive from 'components/molecules/DispositionActive/DispositionActive';

const DispositionUserView = () => {
  const { appState } = useAuth();
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
