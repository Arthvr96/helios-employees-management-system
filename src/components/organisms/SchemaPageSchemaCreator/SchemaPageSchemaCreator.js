import React, { useState } from 'react';
import NavDays from 'components/molecules/NavDays/NavDays';
import DayContent from 'components/organisms/DayContent/DayContent';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Button } from 'components/atoms/Button/Button';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { StyledCard, WrapperButtons, StyledList, Separator } from './SchemaPageSchemaCreator.style';

const SchemaPageSchemaCreator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const { selectedDay, handleChangePage, handleSaveNewSchema } = useSchemaCreatorContext();

  const onCancel = () => {
    setIsVisible(false);
    handleChangePage('goToMenu');
  };

  const handleSave = () => {
    setIsVisible(false);
    handleSaveNewSchema();
  };

  return (
    <>
      <PopupConfirm
        title="Czy napewno chcesz zapisac szablon?"
        handleConfirm={handleSave}
        handleCancel={() => setIsVisible(false)}
        isVisible={isVisible}
      />
      <PopupConfirm
        title="Czy napewno chcesz anulować tworzenie szablonu?"
        handleConfirm={onCancel}
        handleCancel={() => setIsVisible2(false)}
        isVisible={isVisible2}
      />

      <StyledCard>
        <NavDays />
        {selectedDay.id && <DayContent />}

        <WrapperButtons>
          <Button onClick={() => setIsVisible(true)} margin="0 1rem 0 0" type="button">
            Zapisz szablon
          </Button>
          <Button isCancel onClick={() => setIsVisible2(true)} type="button">
            Anuluj tworzenie szablonu
          </Button>
        </WrapperButtons>
      </StyledCard>
      <CardTemplate margin="2rem 0 0 0" padding="2rem 4rem">
        <CardTitle margin="0 0 2rem 0">Skróty klawiszowe</CardTitle>
        <StyledList>
          <Separator>*Żaden dzien nie jest zaznaczony*</Separator>
          <li>
            <span>Shift + →</span> - ostatni dzien z listy
          </li>
          <li>
            <span>Shift + ←</span> - pierwszy dzien z listy
          </li>
          <Separator>*Jakis dzien jest zaznaczony*</Separator>
          <li>
            <span>Shift + →</span> - następny dzien
          </li>
          <li>
            <span>Shift + ←</span> - poprzedni dzien
          </li>
          <li>
            <span>Shift + 1-7</span> - stanowiska pracy
          </li>
          <Separator>*Stanowisko pracy wybrane*</Separator>
          <li>
            <span>t</span> - włącz lub wyłącz stanowisko pracy
          </li>
          <Separator>*Stanowisko pracy wybrane i włączone*</Separator>
          <li>
            <span>n</span> - stwórz nową zmiane
          </li>
          <Separator>*Podczas tworzenia zmiany*</Separator>
          <li>
            <span>enter</span> - zatwierdza zmiane
          </li>
          <li>
            <span>esc</span> - anuluje tworzenie zmiany
          </li>
        </StyledList>
      </CardTemplate>
    </>
  );
};

export default SchemaPageSchemaCreator;
