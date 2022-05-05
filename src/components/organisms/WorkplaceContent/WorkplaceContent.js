import React, { useEffect, useState } from 'react';
import ToggleButton from 'components/molecules/ToggleButton/ToggleButton';
import ShiftsSlider from 'components/organisms/ShiftsSlider/ShiftsSlider';
import NewShiftForm from 'components/molecules/NewShiftForm/NewShiftForm';
import NewShiftButton from 'components/atoms/NewShiftButton/NewShiftButton';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { Wrapper } from './WorkplaceContent.style';

const WorkplaceContent = () => {
  const { selectedDay, selectedWorkplace, schemaData, handleUpdateSchemaDate } =
    useSchemaCreatorContext();
  const { isActive } = schemaData[selectedDay.id][selectedWorkplace.id];
  const [shiftFormIsOpen, setShiftFormState] = useState(false);
  const [editValues, setEditValues] = useState({ from: '', to: '' });
  const { getDisplayTime } = heliosAppSdk.__helpers__;

  const editShift = (shiftId) => {
    const shift = schemaData[selectedDay.id][selectedWorkplace.id].shifts.find(
      (el) => el.id === shiftId,
    );
    setShiftFormState(true);
    setEditValues({ from: getDisplayTime(shift.from), to: getDisplayTime(shift.to), id: shift.id });
  };

  const handleSave = (values) => {
    handleUpdateSchemaDate('createShift', values, editValues.id);
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

  useEffect(() => {
    setShiftFormState(false);
  }, [selectedWorkplace]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 84) {
        handleToggle();
      }
      if (e.keyCode === 78) {
        setShiftFormState(true);
      }
      if (e.keyCode === 27) {
        setShiftFormState(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isActive, shiftFormIsOpen, selectedDay, selectedWorkplace, schemaData]);

  useEffect(() => {
    if (shiftFormIsOpen) {
      const input = document.querySelector('#from');
      if (input) {
        input.focus();
      }
    }
  }, [shiftFormIsOpen]);

  return (
    <Wrapper>
      <ToggleButton onClick={handleToggle} state={isActive} />
      {isActive && (
        <>
          <ShiftsSlider onEdit={editShift} />
          <NewShiftButton onClick={() => setShiftFormState(true)} />
        </>
      )}
      {isActive && shiftFormIsOpen && (
        <NewShiftForm
          initValues={{ to: editValues.to, from: editValues.from }}
          handleSave={handleSave}
          handleCancel={() => setShiftFormState(false)}
        />
      )}
    </Wrapper>
  );
};

export default WorkplaceContent;
