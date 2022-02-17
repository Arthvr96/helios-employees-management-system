import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { Button } from 'components/atoms/Button/Button';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import { WrapperWindows, Wrapper, Table } from './DispositionsArchive.style';

const DispositionsArchive = () => {
  const [selectedCycle, setSelectedCycle] = useState('selectCycle');
  const [dispoRespond, setDispoRespond] = useState(null);
  const [selectedDispo, setSelectedDispo] = useState(null);
  const [options, setOptions] = useState(null);

  const handleGetDisposition = () => {
    setSelectedDispo(Object.values(dispoRespond[selectedCycle]));
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
            values={options}
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
      {selectedDispo ? (
        <CardTemplate margin="0 0 0 3rem">
          <CardTitle margin="0 0 2rem 0">{selectedCycle}</CardTitle>
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
              {selectedDispo.map((dispo) => (
                <tr key={dispo.alias} className={!dispo.disposition.day1 ? 'notSent' : 'sent'}>
                  <td className="alias">{dispo.alias}</td>
                  {dispo.disposition.day1 ? (
                    <>
                      <td>{getShiftName(dispo.disposition.day1)}</td>
                      <td>{getShiftName(dispo.disposition.day2)}</td>
                      <td>{getShiftName(dispo.disposition.day3)}</td>
                      <td>{getShiftName(dispo.disposition.day4)}</td>
                      <td>{getShiftName(dispo.disposition.day5)}</td>
                      <td>{getShiftName(dispo.disposition.day6)}</td>
                      <td>{getShiftName(dispo.disposition.day7)}</td>
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
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </CardTemplate>
      ) : null}
    </WrapperWindows>
  );
};

export default DispositionsArchive;
