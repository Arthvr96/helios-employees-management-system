import React, { useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import NewCycleForm from 'components/organisms/NewCycleForm/NewCycleForm';

const marathonValuesInit = {
  day1: false,
  day2: false,
  day3: false,
  day4: false,
  day5: false,
  day6: false,
  day7: false,
};
const workDaysValuesInit = {
  day1: true,
  day2: true,
  day3: true,
  day4: true,
  day5: true,
  day6: true,
  day7: true,
};

const TITLE = 'Rozpocznij nowy okres grafiku !';
const SUBTITLE = 'Wybierz nowy okres dla grafiku i odblokuj wysyłanie dyspozycji';
const TITLEPOPUP = 'Czy napewno chcesz zacząć nowy okres dla grafiku?';
const SUBTITLEPOPUP = 'Wybrany okres to : ';

const NewCycleWindow = () => {
  const { appState } = useGlobalState();
  const { handleChangeStateApp } = useGlobalState();
  const [isVisible, setVisible] = useState(false);
  const [valuesForm, setValuesForm] = useState({ date1: '', date2: '' });
  const [marathonCheckboxValues, setMarathonCheckboxValues] = useState(marathonValuesInit);
  const [workDaysCheckboxValues, setWorkDaysCheckboxValues] = useState(workDaysValuesInit);

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  const handleSubmit = (values, method) => {
    toggleVisible();
    method.resetForm();
    setValuesForm({ ...values });
  };

  const handleConfirm = () => {
    toggleVisible();
    handleChangeStateApp('newCycle', {
      ...valuesForm,
      marathon: marathonCheckboxValues,
      workDays: workDaysCheckboxValues,
    });
  };

  return (
    <>
      <PopupConfirm
        title={TITLEPOPUP}
        subtitle={`${SUBTITLEPOPUP}${valuesForm.date1} : ${valuesForm.date2}`}
        isVisible={isVisible}
        handleConfirm={handleConfirm}
        handleCancel={toggleVisible}
      />
      <CardTemplate>
        <CardTitle>{TITLE}</CardTitle>
        <CardSubtitle>{SUBTITLE}</CardSubtitle>
        <CardSubtitle>{`Ostatni wybrany okres: ${appState.lastDate1} - ${appState.lastDate2}`}</CardSubtitle>
        <NewCycleForm
          toggleVisible={toggleVisible}
          onSubmit={handleSubmit}
          marathonDays={marathonCheckboxValues}
          setMarathonDays={setMarathonCheckboxValues}
          workDays={workDaysCheckboxValues}
          setWorkDays={setWorkDaysCheckboxValues}
        />
      </CardTemplate>
    </>
  );
};

export default NewCycleWindow;
