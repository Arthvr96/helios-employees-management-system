import React, { useEffect, useRef, useState } from 'react';
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

const TableWindow = ({ selectedCycle, selectedDispo, handleShowMsg, workDaysValues }) => {
  const tableRef = useRef(null);
  const [workDays, setWorkDays] = useState([]);
  const [sortedDispo, setSortedDispo] = useState([]);
  const [msgVisible, setMsgVisible] = useState(true);
  const { getShiftMark, getArrDays, getDayShortName, exportToExcel } = HeliosAppSdk.__helpers__;
  const [arrDates, setArrDates] = useState([]);
  const date1 = `${selectedCycle.slice(8, 10)}.${selectedCycle.slice(5, 7)}.${selectedCycle.slice(
    0,
    4,
  )}`;
  const date2 = `${selectedCycle.slice(19, 21)}.${selectedCycle.slice(
    16,
    18,
  )}.${selectedCycle.slice(11, 15)}`;

  const handleDownloadTable = () => {
    exportToExcel(tableRef.current, 'xlsx');
  };

  useEffect(() => {
    const d1 = selectedCycle.slice(0, 10);
    const d2 = selectedCycle.slice(11, 21);
    const arr = getArrDays(d1, d2);

    const arr2 = [];
    arr.forEach((el) => {
      arr2.push(el.split(' '));
    });

    const result = [];

    arr2.forEach((el) => {
      result.push(
        `${getDayShortName(el[0].slice(0, 2))} ${el[1].slice(3, 5)}.${el[1].slice(0, 2)}`,
      );
    });

    setArrDates(result);
  }, []);

  useEffect(() => {
    if (selectedDispo) {
      const arr = [...selectedDispo];
      arr.sort((a, b) => a.alias.localeCompare(b.alias));
      setSortedDispo([...arr]);
    }
  }, []);

  useEffect(() => {
    const { day1, day2, day3, day4, day5, day6, day7 } = workDaysValues;
    setWorkDays([day1, day2, day3, day4, day5, day6, day7]);
  }, []);

  return (
    <CardTemplate margin="0 0 0 3rem">
      <WindowTitleWrapper>
        <div>
          <Button
            onClick={() => setMsgVisible(!msgVisible)}
            isCancel={!msgVisible}
            margin="0 1rem"
            padding="0.5rem"
            type="button"
          >
            {msgVisible ? `msg on` : `msg off`}
          </Button>
          <Button onClick={handleDownloadTable} margin="0 1rem" padding="0.5rem" type="button">
            pobierz tabele
          </Button>
        </div>
      </WindowTitleWrapper>
      <Table ref={tableRef}>
        <thead>
          <tr>
            <th className="tabTitle" colSpan={msgVisible ? 10 : 9}>{`"${date1}-${date2}"`}</th>
          </tr>
          <tr>
            <th className="name">Imię i nazwisko</th>
            {arrDates.map((el, i) => (
              <th
                className={`day ${el.includes('sb') || el.includes('nd') ? 'weekend' : ''} ${
                  !workDays[i] ? 'dayFree' : ''
                }`}
                key={el}
              >
                {el}
              </th>
            ))}
            <th className="name">Podpis</th>
            {msgVisible ? <th>Msg?</th> : null}
          </tr>
        </thead>
        <tbody>
          {sortedDispo &&
            setSortedDispo &&
            sortedDispo.map((dispo) => (
              <tr
                key={dispo.alias}
                className={`${dispo.coffee ? 'coffee' : ''} ${
                  !dispo.disposition.day1 && 'notSent'
                }`}
              >
                <td className="alias">{dispo.alias}</td>
                {dispo.disposition.day1 ? (
                  <>
                    <td className={`${!workDays[0] ? 'dayFree' : ''}`}>
                      {getShiftMark(dispo.disposition.day1)}
                    </td>
                    <td className={`${!workDays[1] ? 'dayFree' : ''}`}>
                      {getShiftMark(dispo.disposition.day2)}
                    </td>
                    <td className={`${!workDays[2] ? 'dayFree' : ''}`}>
                      {getShiftMark(dispo.disposition.day3)}
                    </td>
                    <td className={`${!workDays[3] ? 'dayFree' : ''}`}>
                      {getShiftMark(dispo.disposition.day4)}
                    </td>
                    <td className={`${!workDays[4] ? 'dayFree' : ''}`}>
                      {getShiftMark(dispo.disposition.day5)}
                    </td>
                    <td className={`${!workDays[5] ? 'dayFree' : ''}`}>
                      {getShiftMark(dispo.disposition.day6)}
                    </td>
                    <td className={`${!workDays[6] ? 'dayFree' : ''}`}>
                      {getShiftMark(dispo.disposition.day7)}
                    </td>
                    <td />
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
                    <td className={`${!workDays[0] ? 'dayFree' : ''}`}>-</td>
                    <td className={`${!workDays[1] ? 'dayFree' : ''}`}>-</td>
                    <td className={`${!workDays[2] ? 'dayFree' : ''}`}>-</td>
                    <td className={`${!workDays[3] ? 'dayFree' : ''}`}>-</td>
                    <td className={`${!workDays[4] ? 'dayFree' : ''}`}>-</td>
                    <td className={`${!workDays[5] ? 'dayFree' : ''}`}>-</td>
                    <td className={`${!workDays[6] ? 'dayFree' : ''}`}>-</td>
                    <td />
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
  workDaysValues: PropTypes.objectOf(PropTypes.bool),
  selectedDispo: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      alias: PropTypes.string,
      disposition: PropTypes.objectOf(PropTypes.array),
    }),
  ),

  handleShowMsg: PropTypes.func.isRequired,
};

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
          <TableWindow
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
