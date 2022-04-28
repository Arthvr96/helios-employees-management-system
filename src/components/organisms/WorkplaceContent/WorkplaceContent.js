import React, { useEffect, useState } from 'react';
import ToggleButton from 'components/molecules/ToggleButton/ToggleButton';
import ShiftsSlider from 'components/organisms/ShiftsSlider/ShiftsSlider';
import NewShiftForm from 'components/molecules/NewShiftForm/NewShiftForm';
import NewShiftButton from 'components/atoms/NewShiftButton/NewShiftButton';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Wrapper } from './WorkplaceContent.style';

const WorkplaceContent = () => {
  const { selectedDay, selectedWorkplace, schemaData, handleUpdateSchemaDate } =
    useSchemaCreatorContext();
  const { isActive } = schemaData[selectedDay.id][selectedWorkplace.id];
  const [shiftFormIsOpen, setShiftFormState] = useState(false);

  const handleSave = (values) => {
    handleUpdateSchemaDate('createShift', values);
  };

  const handleToggle = () => {
    if (isActive && shiftFormIsOpen) {
      setShiftFormState(false);
    }
    handleUpdateSchemaDate('changeToggle', { isActive: !isActive });
  };

  useEffect(() => {
    if (!isActive) {
      handleUpdateSchemaDate('clearShifts');
    }
  }, [isActive]);

  return (
    <Wrapper>
      <ToggleButton onClick={handleToggle} state={isActive} />
      {isActive && (
        <>
          <ShiftsSlider />
          <NewShiftButton onClick={() => setShiftFormState(true)} />
        </>
      )}
      {isActive && shiftFormIsOpen && (
        <NewShiftForm handleSave={handleSave} handleCancel={() => setShiftFormState(false)} />
      )}
    </Wrapper>
  );
};

export default WorkplaceContent;
