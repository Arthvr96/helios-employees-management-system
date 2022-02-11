import React, { useEffect, useState } from 'react';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import DispoForm from 'components/organisms/DispoForm/DispoForm';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { StyledStrong } from 'components/atoms/StyledStrong/StyledStrong';
import { dispositionSortedEmployeesFunctions } from 'functions/dispositionSortedEmployeesFunctions';

const DispositionActive = () => {
  const { appState, currentUser } = useAuth();
  const [cycleData, setCycleData] = useState({});
  const [dispoSanded, setDispoSanded] = useState(false);
  const [page, setPage] = useState('dispoDashboard');
  const { createNewCycle, getEmployeeDispositions, updateDispoSendInfo } =
    dispositionSortedEmployeesFunctions();

  const handleSwitchPage = (target) => {
    if (target === 'toDispoDashboard') {
      setPage('dispoDashboard');
    } else if (target === 'toFormDispo') {
      setPage('formDispo');
    }
  };

  const handleCreateNewCycle = () => {
    if (!cycleData) {
      const cycleId = `${appState.date1}-${appState.date2}`;
      createNewCycle(currentUser.id, cycleId)
        .then((cycleSchema) => {
          setCycleData({ ...cycleSchema });
        })
        .catch((error) => {
          window.alert(error.code);
        });
      updateDispoSendInfo(currentUser).catch((error) => {
        window.alert(error.code);
      });
    }
  };

  useEffect(() => {
    if (appState.state === 'active' && cycleData) {
      setDispoSanded(true);
    } else if (appState.state === 'active' && !cycleData) {
      setDispoSanded(false);
    }
  }, [cycleData]);

  useEffect(() => {
    if (appState.state === 'active') {
      const cycleId = `${appState.date1}-${appState.date2}`;
      getEmployeeDispositions(currentUser.id)
        .then((docData) => {
          setCycleData(docData[cycleId]);
        })
        .catch((error) => {
          window.alert(error.code);
        });
    }
  }, [appState]);

  return (
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
            {dispoSanded ? 'Edytuj dyspozycje' : 'Wyślij dyspozycje'}
          </Button>
        </>
      ) : null}
    </CardTemplate>
  );
};

export default DispositionActive;