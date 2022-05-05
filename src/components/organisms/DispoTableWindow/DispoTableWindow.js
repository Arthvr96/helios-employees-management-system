import React, { useEffect, useRef, useState } from 'react';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import PropTypes from 'prop-types';
import { Button } from 'components/atoms/Button/Button';
import { MsgButton, Table, WindowTitleWrapper } from './DispoTableWindow.style';

const DispoTableWindow = React.forwardRef(
  ({ selectedCycle, selectedDispo, handleShowMsg, workDaysValues, margin, isShowCase }, ref) => {
    const tableRef = useRef(null);
    const [workDays, setWorkDays] = useState([]);
    const [sortedDispo, setSortedDispo] = useState([]);
    const [msgVisible, setMsgVisible] = useState(true);
    const { getShiftMark, getArrDays, getDayShortName, exportToExcel, convertFormatDate } =
      HeliosAppSdk.__helpers__;
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
      setMsgVisible(!isShowCase);
    }, []);

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
        result.push(`${getDayShortName(el[0])} ${convertFormatDate(el[1])}`);
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
      <CardTemplate margin={margin || '0 0 0 3rem'}>
        <WindowTitleWrapper>
          {!isShowCase ? (
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
          ) : null}
        </WindowTitleWrapper>
        <Table ref={ref || tableRef}>
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
              {!isShowCase && <th className="name">Podpis</th>}
              {msgVisible ? <th>Msg?</th> : null}
              {isShowCase && <th className="percent">zmiany/dyspo</th>}
            </tr>
          </thead>
          <tbody>
            {sortedDispo &&
              setSortedDispo &&
              sortedDispo.map((dispo, rowIndex) => (
                <tr
                  key={dispo.alias}
                  className={`${dispo.alias.replace(' ', '')} ${dispo.coffee ? 'coffee' : ''} ${
                    !dispo.disposition.day1 ? 'notSent' : 'sent'
                  }`}
                >
                  <td className={`alias alias-row-${rowIndex}`}>{dispo.alias}</td>
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
                      {!isShowCase && <td />}
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
                      {isShowCase && <td className={`percentTarget percent-row-${rowIndex}`} />}
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
                      {!isShowCase && <td />}
                      {msgVisible ? <td>Nie</td> : null}
                      {isShowCase && <td />}
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </CardTemplate>
    );
  },
);

DispoTableWindow.propTypes = {
  margin: PropTypes.string,
  isShowCase: PropTypes.bool,
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

export default DispoTableWindow;
