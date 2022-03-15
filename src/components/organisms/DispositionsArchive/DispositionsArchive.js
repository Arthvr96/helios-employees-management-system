import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import PropTypes from 'prop-types';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import LoadingScreen from 'components/molecules/LoadingScreen/LoadingScreen';
import {
  WrapperWindows,
  Wrapper,
  Table,
  MsgButton,
  StyledCardTitle,
  WindowTitleWrapper,
} from './DispositionsArchive.style';

const TableWindow = ({ selectedCycle, selectedDispo, handleShowMsg }) => {
  const [sortedDispo, setSortedDispo] = useState([]);
  const [msgVisible, setMsgVisible] = useState(true);
  const { getShiftMark } = HeliosAppSdk.__helpers__;

  useEffect(() => {
    if (selectedDispo) {
      const arr = [...selectedDispo];
      arr.sort((a, b) => a.alias.localeCompare(b.alias));
      setSortedDispo([...arr]);
    }
  }, []);

  return (
    <CardTemplate margin="0 0 0 3rem">
      <WindowTitleWrapper>
        <CardTitle margin="0 0 2rem 0">{selectedCycle}</CardTitle>
        <Button
          onClick={() => setMsgVisible(!msgVisible)}
          isCancel={!msgVisible}
          margin="0 1rem"
          padding="0.5rem"
          type="button"
        >
          {msgVisible ? `msg on` : `msg off`}
        </Button>
      </WindowTitleWrapper>
      <Table>
        <thead>
          <tr>
            <th>Alias</th>
            <th>PT</th>
            <th>SB</th>
            <th>ND</th>
            <th>PN</th>
            <th>WT</th>
            <th>SR</th>
            <th>CZ</th>
            {msgVisible ? <th>Msg?</th> : null}
          </tr>
        </thead>
        <tbody>
          {sortedDispo &&
            setSortedDispo &&
            sortedDispo.map((dispo) => (
              <tr key={dispo.alias} className={!dispo.disposition.day1 ? 'notSent' : 'sent'}>
                <td className="alias">{dispo.alias}</td>
                {dispo.disposition.day1 ? (
                  <>
                    <td>{getShiftMark(dispo.disposition.day1)}</td>
                    <td>{getShiftMark(dispo.disposition.day2)}</td>
                    <td>{getShiftMark(dispo.disposition.day3)}</td>
                    <td>{getShiftMark(dispo.disposition.day4)}</td>
                    <td>{getShiftMark(dispo.disposition.day5)}</td>
                    <td>{getShiftMark(dispo.disposition.day6)}</td>
                    <td>{getShiftMark(dispo.disposition.day7)}</td>
                    {msgVisible ? (
                      <td className={dispo.message && 'green'}>
                        {dispo.message ? (
                          <MsgButton onClick={() => handleShowMsg(dispo.alias, dispo.message)}>
                            Tak
                          </MsgButton>
                        ) : (
                          'Nie'
                        )}
                      </td>
                    ) : null}
                  </>
                ) : (
                  <>
                    <td>C</td>
                    <td>C</td>
                    <td>C</td>
                    <td>C</td>
                    <td>C</td>
                    <td>C</td>
                    <td>C</td>
                    {msgVisible ? <td>Nie</td> : null}
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </CardTemplate>
  );
};

TableWindow.propTypes = {
  selectedCycle: PropTypes.string.isRequired,
  selectedDispo: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      alias: PropTypes.string,
      disposition: PropTypes.objectOf(PropTypes.array),
    }),
  ),

  handleShowMsg: PropTypes.func.isRequired,
};

const DispositionsArchive = () => {
  const [selectedCycle, setSelectedCycle] = useState('selectCycle');
  const [dispoRespond, setDispoRespond] = useState(null);
  const [selectedDispo, setSelectedDispo] = useState(null);
  const [options, setOptions] = useState(null);
  const [employeeMessage, setEmployeeMessage] = useState({ isOpen: false, alias: '', message: '' });
  const [deleteCyclePopup, setDeleteCyclePopup] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { deleteCycle } = HeliosAppSdk.firestore;
  const { appState } = useGlobalState();

  const handleGetDisposition = () => {
    setSelectedDispo(Object.values(dispoRespond[selectedCycle]));
  };

  const handleConfirm = () => {
    setInProgress(true);
    setDeleteCyclePopup(false);
    deleteCycle(selectedCycle, appState)
      .then(() => {
        const arr = [...options];
        arr.splice(arr.indexOf(selectedCycle), 1);
        setOptions(arr);
        setSelectedCycle('selectCycle');
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
          optionsArr.sort((a, b) => {
            const date1 = new Date(a.slice(0, 10));
            const date2 = new Date(b.slice(0, 10));

            return date2 - date1;
          });
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
                values={options}
                value={selectedCycle}
                handleChange={setSelectedCycle}
              />
            </Wrapper>
            <Button
              width="100%"
              type="button"
              onClick={handleGetDisposition}
              margin="1rem 0 0 0"
              disabled={selectedCycle === 'selectCycle'}
            >
              Wyświetl dyspozycje
            </Button>
            <SubmitButton
              disabled={selectedCycle === 'selectCycle' || appState.state !== 'nonActive'}
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
            <CardTemplate minWidth="390px" margin="2.5rem 0">
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
          <TableWindow
            selectedCycle={selectedCycle}
            selectedDispo={selectedDispo}
            handleShowMsg={handleShowMsg}
          />
        ) : null}
      </WrapperWindows>
    </>
  );
};

export default DispositionsArchive;
