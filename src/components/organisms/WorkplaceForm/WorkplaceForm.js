import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'components/molecues/ToggleButton/ToggleButton';
import { getPolishDayName } from 'helpers/helpers';
import { Title, Content, ActiveWorkplaceWrapper } from './WorkplaceForm.style';

const WorkplaceForm = ({ selectedDay, selectedWorkplace, schema, workplacespl }) => {
  const { isActive } = schema[selectedDay][selectedWorkplace];
  const [buttonState, setButtonState] = useState(isActive);

  useEffect(() => {
    if (isActive !== buttonState) {
      schema[selectedDay][selectedWorkplace].isActive = buttonState;
    }
  }, [buttonState]);

  return (
    <>
      <Title>
        {getPolishDayName(selectedDay)} - <span>{workplacespl}</span>
      </Title>
      <Content>
        <ActiveWorkplaceWrapper>
          <h4>Stanowisko aktywne/nieaktywne : </h4>
          <ToggleButton buttonState={buttonState} setButtonState={setButtonState} />
        </ActiveWorkplaceWrapper>
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
