import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/atoms/Button/Button';
import { Wrapper, Popup, Title, Form, WrapperButtons } from './ShiftFormPupUp.style';

const roundQuarter = (time) => {
  const minutes = parseInt(time.slice(3, 5), 10);
  const hours = time.slice(0, 2);
  const quater = parseInt(minutes / 15, 10) * 15;
  const minutesString = quater < 15 ? `0${quater}` : `${quater}`;
  return `${hours}:${minutesString}`;
};

const ShiftFormPopUp = ({
  activeNewShift,
  setActiveNewShift,
  handleShiftEvent,
  editedShift,
  setEditedShift,
  editMode,
  setEditMode,
}) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (start && end) {
      setError('');
      if (editMode) {
        setEditMode(false);
        setEditedShift([]);
        handleShiftEvent(1, [editedShift[0], roundQuarter(start), roundQuarter(end)]);
        setStart(roundQuarter(start));
        setEnd(roundQuarter(end));
      } else {
        handleShiftEvent(0, [roundQuarter(start), roundQuarter(end)]);
        setActiveNewShift(false);
        setStart(roundQuarter(start));
        setEnd(roundQuarter(end));
      }
    } else {
      setError('Podaj godzine rozpoczęcia i zakończenia !');
    }
  };
  const handleCancel = () => {
    if (editMode) {
      setEditMode(false);
      setEditedShift([]);
    } else {
      setActiveNewShift(false);
    }
  };

  useEffect(() => {
    if (editMode) {
      setStart(editedShift[1]);
      setEnd(editedShift[2]);
    }
  }, [editMode, editedShift]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        handleCancel();
      }
      if (e.keyCode === 13) {
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [start, end]);

  return (
    <Wrapper>
      {activeNewShift || editMode ? (
        <Popup>
          <Title>
            {editMode ? `Edycja zmiany nr ${parseInt(editedShift[0], 10) + 1}` : 'Nowa zmiana'}
          </Title>
          <Form>
            <label htmlFor="start">
              <span>Start zmiany :</span>
              <input
                name="start"
                id="start"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
            <label htmlFor="noShift">
              <span>Koniec zmiany :</span>
              <input
                name="end"
                id="end"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
          </Form>
          {error || null}
          <WrapperButtons>
            <Button onClick={handleSave}>Zapisz</Button>
            <Button isCancel onClick={handleCancel}>
              Anuluj
            </Button>
          </WrapperButtons>
        </Popup>
      ) : null}
    </Wrapper>
  );
};

export default ShiftFormPopUp;

ShiftFormPopUp.propTypes = {
  activeNewShift: PropTypes.bool,
  editMode: PropTypes.bool,
  setActiveNewShift: PropTypes.func,
  handleShiftEvent: PropTypes.func,
  editedShift: PropTypes.arrayOf(PropTypes.string),
  setEditedShift: PropTypes.func,
  setEditMode: PropTypes.func,
};
