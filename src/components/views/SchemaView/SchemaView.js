import React, { useState } from 'react';
import DaysListNav from 'components/molecues/DaysListNav/DaysListNav';
import SchemaGraphDayContent from 'components/organisms/SchemaGraphDayContent/SchemaGraphDayContent';
import { Wrapper, SchemaGraphFormWrapper } from './SchemaView.style';

const SchemaView = () => {
  const [selectedDay, setSelectedDay] = useState('');

  return (
    <Wrapper>
      <SchemaGraphFormWrapper>
        <DaysListNav selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <SchemaGraphDayContent selectedDay={selectedDay} />
      </SchemaGraphFormWrapper>
    </Wrapper>
  );
};

export default SchemaView;
