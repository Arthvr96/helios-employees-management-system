import React, { useState } from 'react';
import DaysListNav from 'components/molecues/DaysListNav/DaysListNav';
import SchemaGraphDayContent from 'components/organisms/SchemaGraphDayContent/SchemaGraphDayContent';
import { SchemaGraphFormWrapper } from './SchemaGraphForm.style';

const SchemaGraphForm = () => {
  const [selectedDay, setSelectedDay] = useState('');
  return (
    <SchemaGraphFormWrapper>
      <DaysListNav selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <SchemaGraphDayContent selectedDay={selectedDay} />
    </SchemaGraphFormWrapper>
  );
};

export default SchemaGraphForm;
