import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { dispoExample } from 'components/organisms/DispositionsArchive/alias';
import { WrapperWindows, Wrapper, Table } from './DispositionsArchive.style';

const values = ['Aktualny-01-02-2022-07-02-2022', '08-02-2022-15-02-2022', '16-02-2022-23-02-2022'];

const DispositionsArchive = () => {
  const [selectedCycle, setSelectedCycle] = useState('selectCycle');
  const [dispoRespond, setDispoRespond] = useState(null);

  const handleGetDisposition = () => {
    setDispoRespond(JSON.parse(dispoExample));
  };

  useEffect(() => {
    setDispoRespond(null);
  }, [selectedCycle]);

  const getShiftName = (dispo) => {
    if (dispo[0] === 'freeDay') {
      return '-';
    }
    if (dispo[0] === 'wholeDay') {
      if (dispo[3]) {
        return 'C+';
      }
      return 'C';
    }
    if (dispo[0] === 'range') {
      if (dispo[1] === '8') {
        return `do ${dispo[2]}`;
      }
      if (dispo[2] === '30') {
        return `od ${dispo[1]}`;
      }
      if (dispo[1] === '8' && dispo[2] === '30') {
        return 'C';
      }
      if (dispo[1] !== '8' && dispo[2] !== '30') {
        return `${dispo[1]}-${dispo[2]}`;
      }
    }
    return null;
  };

  return (
    <WrapperWindows>
      <CardTemplate>
        <CardTitle>Archiwum wysłanych dyspozycji</CardTitle>
        <Wrapper>
          <CardSubtitle fontWeight="regular" margin="0 1rem 0 0">
            Wybierz dyspozycje z okresu:
          </CardSubtitle>
          <InputSelect
            margin="1rem 0 0 0"
            values={values}
            value={selectedCycle}
            handleChange={setSelectedCycle}
          />
        </Wrapper>
        <Button
          onClick={handleGetDisposition}
          margin="1rem 0 0 0"
          disabled={selectedCycle === 'selectCycle'}
        >
          Wyświetl dyspozycje
        </Button>
      </CardTemplate>
      {dispoRespond ? (
        <CardTemplate margin="0 0 0 3rem">
          <CardTitle margin="0 0 2rem 0">{selectedCycle}</CardTitle>
          {dispoRespond ? (
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
                </tr>
              </thead>
              <tbody>
                {dispoRespond.map((dispo) => (
                  <tr key={dispo.alias}>
                    <td className="alias">{dispo.alias}</td>
                    <td>{getShiftName(dispo.disposition.day1)}</td>
                    <td>{getShiftName(dispo.disposition.day2)}</td>
                    <td>{getShiftName(dispo.disposition.day3)}</td>
                    <td>{getShiftName(dispo.disposition.day4)}</td>
                    <td>{getShiftName(dispo.disposition.day5)}</td>
                    <td>{getShiftName(dispo.disposition.day6)}</td>
                    <td>{getShiftName(dispo.disposition.day7)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : null}
        </CardTemplate>
      ) : null}
    </WrapperWindows>
  );
};

export default DispositionsArchive;
