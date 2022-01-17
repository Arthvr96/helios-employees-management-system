import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DaysListNav from 'components/molecules/DaysListNav/DaysListNav';
import SchemaGraphDayContent from 'components/organisms/SchemaGraphDayContent/SchemaGraphDayContent';
import { SchemaGraphFormWrapper } from './SchemaGraphForm.style';

const SchemaGraphForm = ({ setCreateSchema }) => {
  const [selectedDay, setSelectedDay] = useState('');
  return (
    <SchemaGraphFormWrapper>
      <DaysListNav selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <SchemaGraphDayContent setCreateSchema={setCreateSchema} selectedDay={selectedDay} />
    </SchemaGraphFormWrapper>
  );
};

export default SchemaGraphForm;

SchemaGraphForm.propTypes = {
  setCreateSchema: PropTypes.func,
};
