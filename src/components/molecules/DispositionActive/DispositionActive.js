import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import DispoForm from 'components/organisms/DispoForm/DispoForm';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { StyledStrong } from 'components/atoms/StyledStrong/StyledStrong';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import DispositionFormTutorial from 'components/organisms/DispositionFormTutorial/DispositionFormTutorial';
import { getCookie, setCookie } from 'utliltes/cookies';

const DispositionActive = () => {
  const { appState, currentUser } = useGlobalState();
  const [cycleData, setCycleData] = useState({ message: '', disposition: {} });
  const [dispoSent, setDispoSent] = useState(false);
  const [page, setPage] = useState('dispoDashboard');
  const [dispoTut, setDispoTut] = useState(true);
  const { setDefaultEmployeeDisposition, getEmployeeDisposition, updateDispoSendInfo } =
    HeliosAppSdk.firestore;
  const { dispoPlaceholder } = HeliosAppSdk.__helpers__;

  const handleSwitchPage = (target) => {
    if (target === 'toDispoDashboard') {
      setPage('dispoDashboard');
    } else if (target === 'toFormDispo') {
      setPage('formDispo');
    }
  };

  const handleCreateNewCycle = () => {
    if (!cycleData.disposition) {
      const cycleId = `${appState.date1}-${appState.date2}`;
      setDefaultEmployeeDisposition(currentUser.id, cycleId)
        .then(() => {
          setCycleData({ ...dispoPlaceholder });
        })
        .catch((error) => {
          window.alert(error.code);
        });
      updateDispoSendInfo(currentUser);
    }
  };

  const handleClose = () => {
    setCookie('dispoTut', 'false', 9999);
    setDispoTut(false);
  };

  useEffect(() => {
    const x = getCookie('dispoTut');

    if (x === 'false') {
      setDispoTut(false);
    }
  }, []);

  useEffect(() => {
    if (cycleData.disposition) {
      if (appState.state === 'active' && cycleData.disposition.day1) {
        setDispoSent(true);
      } else if (appState.state === 'active' && !cycleData.disposition.day1) {
        setDispoSent(false);
      }
    }
  }, [cycleData]);

  useEffect(() => {
    if (appState.state === 'active') {
      const cycleId = `${appState.date1}-${appState.date2}`;
      getEmployeeDisposition(currentUser.id)
        .then((docData) => {
          setCycleData(docData.data()[cycleId]);
        })
        .catch((error) => {
          window.alert(error.code);
        });
    }
  }, [appState]);

  return (
    <>
      {page === 'formDispo' && dispoTut ? (
        <DispositionFormTutorial handleClose={handleClose} />
      ) : null}

      <CardTemplate padding="2rem 1rem">
        {page === 'formDispo' ? (
          <DispoForm
            cycleData={cycleData}
            handleSwitchPage={handleSwitchPage}
            setCycleData={setCycleData}
          />
        ) : null}
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
            <Button
              margin="1rem 0 0 0"
              type="button"
              onClick={() => {
                handleSwitchPage('toFormDispo');
                handleCreateNewCycle();
              }}
            >
              {dispoSent ? 'Edytuj dyspozycje' : 'Wyślij dyspozycje'}
            </Button>
          </>
        ) : null}
      </CardTemplate>
    </>
  );
};

export default DispositionActive;
