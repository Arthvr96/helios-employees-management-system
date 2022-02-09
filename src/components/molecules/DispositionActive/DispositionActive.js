import React, { useState } from 'react';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import DispoForm from 'components/organisms/DispoForm/DispoForm';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { StyledStrong } from 'components/atoms/StyledStrong/StyledStrong';

const DispositionActive = () => {
  const { appState } = useAuth();
  const [dispoSanded, setDispoSanded] = useState(false);
  const [page, setPage] = useState('dispoDashboard');

  const handleSwitchPage = (target) => {
    if (target === 'toDispoDashboard') {
      // ToDO : delete nextline in the future
      setDispoSanded(true);
      setPage('dispoDashboard');
    } else if (target === 'toFormDispo') {
      setPage('formDispo');
    }
  };

  return (
    <CardTemplate padding="2rem 1rem">
      {page === 'formDispo' ? <DispoForm handleSwitchPage={handleSwitchPage} /> : null}
      {page === 'dispoDashboard' ? (
        <>
          <CardTitle>Wysyłanie dyspo aktywne!</CardTitle>
          <CardSubtitle fontSize="s">
            Wysyłanie dyspozycji na okres <br />
            <StyledStrong>
              {appState.date1} - {appState.date2}
            </StyledStrong>
            <br />
            jest aktywne
          </CardSubtitle>
          <Button margin="1rem 0 0 0" type="button" onClick={() => handleSwitchPage('toFormDispo')}>
            {dispoSanded ? 'Edytuj dyspozycje' : 'Wyślij dyspozycje'}
          </Button>
        </>
      ) : null}
    </CardTemplate>
  );
};

export default DispositionActive;
