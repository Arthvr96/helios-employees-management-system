import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { StyledStrong } from 'components/atoms/StyledStrong/StyledStrong';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { Button } from 'components/atoms/Button/Button';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import DispoPreview from 'components/molecules/DispoPreview/DispoPreview';
import { StyledTitle } from './DispositionBlocked.style';

const Blocked = () => {
  const [inProgress, setInProgress] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastDispo, setLastDispo] = useState({});
  const [error, setError] = useState('');
  const [days, setDays] = useState([]);
  const { appState, currentUser } = useGlobalState();
  const { getEmployeeDisposition } = HeliosAppSdk.firestore;
  const { getArrDays } = HeliosAppSdk.__helpers__;

  useEffect(() => {
    setInProgress(true);
    const cycleId = `${appState.date1}-${appState.date2}`;
    getEmployeeDisposition(currentUser.id)
      .then((docData) => {
        setInProgress(false);
        setError('');
        const { disposition, message } = docData.data()[cycleId];
        const { day1, day2, day3, day4, day5, day6, day7 } = disposition;
        const obj = {
          dispo: [day1, day2, day3, day4, day5, day6, day7],
          message,
        };
        setLastDispo(obj);
      })
      .catch((e) => {
        setInProgress(false);
        setError('Brak wysłanego dyspo');
      });
  }, []);

  useEffect(() => {
    if (lastDispo && lastDispo.dispo) {
      const arr = [];
      getArrDays(appState.date1, appState.date2).forEach((el) => {
        arr.push(el.split(' '));
      });
      setDays(arr);
    } else {
      setError('Brak wysłanego dyspo');
    }
  }, [lastDispo]);

  return (
    <CardSubtitle fontSize="s">
      <div>
        Wysyłanie dyspozycji na okres <br />
        <StyledStrong>
          {appState.date1} - {appState.date2}
        </StyledStrong>
        <br />
        jest już zablokowane
      </div>
      {inProgress ? (
        <LoaderRing colorVariant2 />
      ) : (
        <Button margin="1.5rem 0 0 0" type="button" onClick={() => setIsVisible(!isVisible)}>
          Pokaż wysłane dyspo
        </Button>
      )}

      {!inProgress && error ? <StyledTitle as="p">{error}</StyledTitle> : null}

      {!inProgress && !error ? (
        <DispoPreview isVisible={isVisible} days={days} dispo={lastDispo} />
      ) : null}
    </CardSubtitle>
  );
};

const NonActive = () => {
  return (
    <CardSubtitle fontSize="s">
      Wciąż nie rozpoczęto nowego okresu wysyłania dyspozycji.
    </CardSubtitle>
  );
};

const DispositionBlocked = () => {
  const { appState } = useGlobalState();
  return (
    <CardTemplate>
      <CardTitle>Wysyłanie dyspo zablokowane!</CardTitle>
      {appState.state === 'blocked' ? <Blocked /> : null}
      {appState.state === 'nonActive' ? <NonActive /> : null}
    </CardTemplate>
  );
};

export default DispositionBlocked;
