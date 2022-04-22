import React, { useEffect, useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { Button } from 'components/atoms/Button/Button';
import DispoPreview from 'components/molecules/DispoPreview/DispoPreview';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';

const ArchiveDispositionsView = () => {
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('default');
  const [options, setOptions] = useState([]);
  const [dispositions, setDispositions] = useState({});
  const [selectedDispo, setSelectedDispo] = useState({});
  const [days, setDays] = useState([]);
  const { currentUser } = useGlobalState();
  const { getEmployeeDisposition } = HeliosAppSdk.firestore;
  const { sortDateCycles, getArrDays, convertFormatDate } = HeliosAppSdk.__helpers__;

  useEffect(() => {
    setInProgress(true);
    getEmployeeDisposition(currentUser.id)
      .then((respond) => {
        setInProgress(false);
        setDispositions(respond.data());
        setOptions(
          Object.keys(respond.data())
            .filter((el) => el !== 'alias')
            .sort(sortDateCycles),
        );
      })
      .catch((e) => {
        setInProgress(false);
        window.alert(e.code);
      });
  }, []);

  const showSelectedDisposition = () => {
    if (value !== 'default' && dispositions) {
      if (dispositions[value] && dispositions[value].disposition) {
        setError('');
        const { disposition, message } = dispositions[value];
        const { day1, day2, day3, day4, day5, day6, day7 } = disposition;
        const obj = {
          dispo: [day1, day2, day3, day4, day5, day6, day7],
          message,
        };
        setSelectedDispo(obj);
        const arr = [];
        const date1 = value.slice(0, 10);
        const date2 = value.slice(11, 21);
        getArrDays(date1, date2).forEach((el) => {
          arr.push(el.split(' '));
        });
        setDays(arr);
        setIsVisible(true);
      } else {
        setError('Brak wysłanej dyspozycji na ten okres');
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, [value]);

  return (
    <ViewTemplate navMargin="40" flexDirection="column" alignItems="center">
      {inProgress ? (
        <LoaderRing />
      ) : (
        <CardTemplate>
          <CardTitle>Archiwum wysłanych dyspozycji</CardTitle>
          <InputSelect
            width="100%"
            margin="1.5rem 0"
            handleChange={setValue}
            options={options}
            value={value}
          />
          {options.length < 2 ? (
            <p>Wyglada na to, że nie wysłałeś/aś jeszcze ani razu dyspozycji</p>
          ) : null}
          <Button
            margin={options.length < 2 ? '1rem 0 0 0' : '0'}
            disabled={value === 'default'}
            type="button"
            onClick={showSelectedDisposition}
          >
            Pokaz dyspo
          </Button>
        </CardTemplate>
      )}

      {isVisible && (
        <CardTemplate margin="2rem" minWidth="350px">
          <CardTitle margin="0 0 1rem 0">{`${convertFormatDate(days[0][1])} - ${convertFormatDate(
            days[6][1],
          )}`}</CardTitle>
          {error ? (
            <p>{error}</p>
          ) : (
            <DispoPreview dispo={selectedDispo} days={days} isVisible={isVisible} />
          )}
        </CardTemplate>
      )}
    </ViewTemplate>
  );
};

export default ArchiveDispositionsView;
