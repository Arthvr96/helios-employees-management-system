import React, { useState } from 'react';
import NavDays from 'components/molecules/NavDays/NavDays';
import DayContent from 'components/organisms/DayContent/DayContent';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Button } from 'components/atoms/Button/Button';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { StyledCard, WrapperButtons } from './SchemaPageSchemaCreator.style';

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
    </>
  );
};

export default SchemaPageSchemaCreator;
