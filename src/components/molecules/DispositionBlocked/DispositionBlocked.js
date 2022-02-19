import React from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { StyledStrong } from 'components/atoms/StyledStrong/StyledStrong';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';

const DispositionBlocked = () => {
  const { appState } = useGlobalState();
  return (
    <CardTemplate>
      <CardTitle>Wysyłanie dyspo zablokowane!</CardTitle>
      {appState.state === 'blocked' ? (
        <CardSubtitle fontSize="s">
          Wysyłanie dyspozycji na okres <br />
          <StyledStrong>
            {appState.date1} - {appState.date2}
          </StyledStrong>
          <br />
          jest już zablokowane
        </CardSubtitle>
      ) : null}
      {appState.state === 'nonActive' ? (
        <CardSubtitle fontSize="s">
          Wciąż nie rozpoczęto nowego okresu wysyłania dyspozycji.
        </CardSubtitle>
      ) : null}
    </CardTemplate>
  );
};

export default DispositionBlocked;
