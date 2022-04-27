import React from 'react';
import NavDays from 'components/molecules/NavDays/NavDays';
import DayContent from 'components/organisms/DayContent/DayContent';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Button } from 'components/atoms/Button/Button';
import { StyledCard, WrapperButtons } from './SchemaPageSchemaCreator.style';

const SchemaPageSchemaCreator = () => {
  const { schemaData, selectedDay, handleChangePage } = useSchemaCreatorContext();

  const onCancel = () => {
    handleChangePage('goToMenu');
  };

  const handleSave = () => {
    console.log(schemaData);
    handleChangePage('goToMenu');
  };

  return (
    <StyledCard>
      <NavDays />
      {selectedDay.id && <DayContent />}

      <WrapperButtons>
        <Button onClick={handleSave} margin="0 1rem 0 0" type="button">
          Zapisz szablon
        </Button>
        <Button isCancel onClick={onCancel} type="button">
          Anuluj tworzenie szablonu
        </Button>
      </WrapperButtons>
    </StyledCard>
  );
};

export default SchemaPageSchemaCreator;
