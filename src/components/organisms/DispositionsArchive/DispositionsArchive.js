import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import LoadingScreen from 'components/molecules/LoadingScreen/LoadingScreen';
import DispoTableWindow from 'components/organisms/DispoTableWindow/DispoTableWindow';
import { WrapperWindows, Wrapper, StyledCardTitle } from './DispositionsArchive.style';

const workDaysDefault = {
  day1: true,
  day2: true,
  day3: true,
  day4: true,
  day5: true,
  day6: true,
  day7: true,
};

const DispositionsArchive = () => {
  const [selectedCycle, setSelectedCycle] = useState('default');
  const [dispoRespond, setDispoRespond] = useState(null);
  const [selectedDispo, setSelectedDispo] = useState(null);
  const [options, setOptions] = useState(null);
  const [employeeMessage, setEmployeeMessage] = useState({ isOpen: false, alias: '', message: '' });
  const [deleteCyclePopup, setDeleteCyclePopup] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { deleteCycle } = HeliosAppSdk.firestore;
  const { sortDateCycles } = HeliosAppSdk.__helpers__;
  const { appState } = useGlobalState();

  const handleGetDisposition = () => {
    if (dispoRespond[selectedCycle].newType) {
      setSelectedDispo({
        data: Object.values(dispoRespond[selectedCycle].data),
        workDays: dispoRespond[selectedCycle].workDays,
      });
    } else {
      setSelectedDispo({
        data: Object.values(dispoRespond[selectedCycle]),
        workDays: workDaysDefault,
      });
    }
  };

  const handleConfirm = () => {
    setInProgress(true);
    setDeleteCyclePopup(false);
    deleteCycle(selectedCycle, appState)
      .then(() => {
        const arr = [...options];
        arr.splice(arr.indexOf(selectedCycle), 1);
        setOptions(arr);
        setSelectedCycle('default');
        localStorage.setItem('options', JSON.stringify(arr));
        setInProgress(false);
      })
      .catch((error) => {
        if (error.message === 'error-cycles-count') {
          window.alert('Pozostało za mało cykli aby usunąć ten cykl');
        } else {
          window.alert(error.code);
        }
        setInProgress(false);
      });
  };

  useEffect(() => {
    if (!localStorage.options && !localStorage.dispoRespond) {
      const q = query(collection(db, 'dispositionsSortedByCycles'));
      getDocs(q)
        .then((docs) => {
          const dispoObj = {};
          const optionsArr = [];
          docs.forEach((el) => {
            dispoObj[el.id] = el.data();
            optionsArr.push(el.id);
          });
          optionsArr.sort(sortDateCycles);
          setOptions(optionsArr);
          setDispoRespond(dispoObj);
          localStorage.setItem('options', JSON.stringify(optionsArr));
          localStorage.setItem('dispoRespond', JSON.stringify(dispoObj));
        })
        .catch((error) => {
          window.alert(error.code);
        });
    } else {
      setOptions(JSON.parse(localStorage.options));
      setDispoRespond(JSON.parse(localStorage.dispoRespond));
    }
  }, []);

  useEffect(() => {
    setSelectedDispo(null);
    handleCloseMsg();
  }, [selectedCycle]);

  const handleShowMsg = (alias, message) => {
    setEmployeeMessage({
      isOpen: true,
      alias,
      message,
    });
  };
  const handleCloseMsg = () => {
    setEmployeeMessage({
      isOpen: false,
      alias: '',
      message: '',
    });
  };

  return (
    <>
      <LoadingScreen isVisible={inProgress} />
      <WrapperWindows>
        <PopupConfirm
          isVisible={deleteCyclePopup}
          handleConfirm={handleConfirm}
          handleCancel={() => setDeleteCyclePopup(false)}
          title={`Czy napewno chcesz usunąć wybrany okres (${selectedCycle}) ?`}
          subtitle="Czynności nie da sie odwrócić"
        />
        <Wrapper>
          <CardTemplate minWidth="390px">
            <CardTitle>Archiwum wysłanych dyspozycji</CardTitle>
            <Wrapper>
              <CardSubtitle fontWeight="regular" margin="0 1rem 0 0">
                Wybierz dyspozycje z okresu:
              </CardSubtitle>
              <InputSelect
                margin="1rem 0 0 0"
                value={selectedCycle}
                handleChange={setSelectedCycle}
                options={options}
              />
            </Wrapper>
            <Button
              width="100%"
              type="button"
              onClick={handleGetDisposition}
              margin="1rem 0 0 0"
              disabled={selectedCycle === 'default'}
            >
              Wyświetl dyspozycje
            </Button>
            <SubmitButton
              disabled={selectedCycle === 'default' || appState.state !== 'nonActive'}
              onClick={() => {
                setDeleteCyclePopup(true);
                handleCloseMsg();
                setSelectedDispo(null);
              }}
              margin="1rem 0 0 0"
              type="button"
              isDangerous
            >
              Usuń okres
            </SubmitButton>
          </CardTemplate>
          {selectedDispo && employeeMessage.isOpen ? (
            <CardTemplate width="390px" margin="2.5rem 0">
              <StyledCardTitle margin="0 0 1rem 0">
                Wiadomość - <span>{employeeMessage.alias}</span>
              </StyledCardTitle>
              <p>{employeeMessage.message}</p>
              <Button onClick={handleCloseMsg} margin="1rem 0 0 0">
                Zamknij wiadomosć
              </Button>
            </CardTemplate>
          ) : null}
        </Wrapper>
        {selectedDispo ? (
          <DispoTableWindow
            selectedCycle={selectedCycle}
            selectedDispo={selectedDispo.data}
            workDaysValues={selectedDispo.workDays}
            handleShowMsg={handleShowMsg}
          />
        ) : null}
      </WrapperWindows>
    </>
  );
};

export default DispositionsArchive;
