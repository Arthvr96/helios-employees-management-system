import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WorkplacesList from 'components/molecues/WorkplacesList/WorkplacesList';
import WorkplacesTarget from 'components/organisms/WorkplacesTarget/WorkplacesTarget';
import { initialSchema } from 'data/cmsResponseInitialSchema';
import { SchemaGraphDayContentWrapper, Wrapper, DecorateLine } from './SchemaGraphDayContent.style';

const SchemaGraphDayContent = ({ selectedDay }) => {
  const [selectedWorkplace, setWorkplace] = useState('');
  const [schema, setSchema] = useState(initialSchema);

  useEffect(() => {
    setWorkplace('');
  }, [selectedDay]);

  return (
    <SchemaGraphDayContentWrapper isVisible={!(selectedDay === '')}>
      <Wrapper isVisible={!(selectedDay === '')}>
        <WorkplacesList selectedWorkplace={selectedWorkplace} setWorkplace={setWorkplace} />
        <DecorateLine />
        <WorkplacesTarget
          schema={schema}
          setSchema={setSchema}
          selectedDay={selectedDay}
          selectedWorkplace={selectedWorkplace}
        />
      </Wrapper>
    </SchemaGraphDayContentWrapper>
  );
};

export default SchemaGraphDayContent;

SchemaGraphDayContent.propTypes = {
  selectedDay: PropTypes.string,
};
