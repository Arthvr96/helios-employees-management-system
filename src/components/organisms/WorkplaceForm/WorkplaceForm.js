import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPolishDayName } from 'helpers/helpers';
import ListAddedShifts from 'components/organisms/ListAddedShifts/ListAddedShifts';
import NewShiftButton from 'components/molecues/NewShiftButton/NewShiftButton';
import ShiftFormPopUp from 'components/organisms/ShiftFormPopUp/ShiftFormPopUp';
import ActiveWorkplace from 'components/molecues/ActiveWorkplace/ActiveWorkplace';
import { Title, Content } from './WorkplaceForm.style';

const WorkplaceForm = ({ selectedDay, selectedWorkplace, schema, workplacespl }) => {
  const { isActive } = schema[selectedDay][selectedWorkplace];
  const [buttonState, setButtonState] = useState(isActive);
  const [listShifts, setListShifts] = useState([
    ...schema[selectedDay][selectedWorkplace].schemaBody,
  ]);
  const [activeNewShift, setActiveNewShift] = useState(false);
  const [editedShift, setEditedShift] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const handleShiftEvent = (eventType, data) => {
    if (eventType === 0) {
      schema[selectedDay][selectedWorkplace].schemaBody = [
        ...schema[selectedDay][selectedWorkplace].schemaBody,
        data,
      ];
      setListShifts([...listShifts, data]);
    }
    if (eventType === 1) {
      schema[selectedDay][selectedWorkplace].schemaBody[data[0]] = [data[1], data[2]];
      setListShifts([...schema[selectedDay][selectedWorkplace].schemaBody]);
    }

    schema[selectedDay][selectedWorkplace].schemaBody.sort((a, b) => {
      const hourStartA = parseInt(a[0].slice(0, 2), 10) + parseInt(a[0].slice(3, 5), 10) / 60;
      const hourStartB = parseInt(b[0].slice(0, 2), 10) + parseInt(b[0].slice(3, 5), 10) / 60;
      const hourEndA = parseInt(a[1].slice(0, 2), 10) + parseInt(a[1].slice(3, 5), 10) / 60;
      const hourEndB = parseInt(b[1].slice(0, 2), 10) + parseInt(b[1].slice(3, 5), 10) / 60;

      if (hourStartA === hourStartB) {
        return hourEndA - hourEndB;
      }
      return hourStartA - hourStartB;
    });
    setListShifts([...schema[selectedDay][selectedWorkplace].schemaBody]);
  };

  const handleDeleteShift = (shiftIndex) => {
    if (shiftIndex === 0) {
      schema[selectedDay][selectedWorkplace].schemaBody.shift();
      setListShifts([...schema[selectedDay][selectedWorkplace].schemaBody]);
    } else if (shiftIndex === listShifts.length - 1) {
      schema[selectedDay][selectedWorkplace].schemaBody.pop();
      setListShifts([...schema[selectedDay][selectedWorkplace].schemaBody]);
    } else {
      const arr1 = listShifts.slice(0, shiftIndex);
      const arr2 = listShifts.slice(shiftIndex + 1);
      const fullArr = [...arr1, ...arr2];

      schema[selectedDay][selectedWorkplace].schemaBody = [...fullArr];
      setListShifts([...schema[selectedDay][selectedWorkplace].schemaBody]);
    }
  };

  useEffect(() => {
    if (isActive !== buttonState) {
      schema[selectedDay][selectedWorkplace].isActive = buttonState;
    }
  }, [buttonState]);

  useEffect(() => {
    const handleClick = (e) => {
      [...e.target.classList].forEach((className) => {
        if (className.includes('shift')) {
          const index = parseInt(className.slice(5), 10);
          setEditedShift([`${index}`, ...listShifts[index]]);
          setEditMode(true);
        }
      });
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  return (
    <>
      <Title>
        {getPolishDayName(selectedDay)} - <span>{workplacespl}</span>
      </Title>
      <ActiveWorkplace buttonState={buttonState} setButtonState={setButtonState} />
      <Content>
        {buttonState ? (
          <>
            <ListAddedShifts listShifts={listShifts} handleDeleteShift={handleDeleteShift} />
            <NewShiftButton activeNewShift={activeNewShift} setActiveNewShift={setActiveNewShift} />
            {activeNewShift || editMode ? (
              <ShiftFormPopUp
                activeNewShift={activeNewShift}
                setActiveNewShift={setActiveNewShift}
                handleShiftEvent={handleShiftEvent}
                editedShift={editedShift}
                setEditedShift={setEditedShift}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            ) : null}
          </>
        ) : null}
      </Content>
    </>
  );
};

export default WorkplaceForm;

WorkplaceForm.propTypes = {
  schema: PropTypes.objectOf(
    PropTypes.shape({
      isActive: PropTypes.bool,
      schemaBody: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  selectedDay: PropTypes.string,
  selectedWorkplace: PropTypes.string,
  workplacespl: PropTypes.string,
};
