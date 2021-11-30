import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WorkplacesList from 'components/molecues/WorkplacesList/WorkplacesList';
import WorkplacesTarget from 'components/organisms/WorkplacesTarget/WorkplacesTarget';

import { initialSchema } from 'data/cmsResponseInitialSchema';
import {
  SchemaGraphDayContentWrapper,
  Wrapper,
  DecorateLine,
  WrapperButtons,
  StyledButton,
} from './SchemaGraphDayContent.style';

const SchemaGraphDayContent = ({ selectedDay }) => {
  const [selectedWorkplace, setWorkplace] = useState('');
  const [schema, setSchema] = useState(initialSchema);

  useEffect(() => {
    setWorkplace('');
  }, [selectedDay]);

  return (
    <SchemaGraphDayContentWrapper isVisible={!(selectedDay === '')}>
      <Wrapper isVisible={!(selectedDay === '')}>
        {selectedDay !== '' ? (
          <>
            <WorkplacesList selectedWorkplace={selectedWorkplace} setWorkplace={setWorkplace} />
            <DecorateLine />
            <WorkplacesTarget
              schema={schema}
              setSchema={setSchema}
              selectedDay={selectedDay}
              selectedWorkplace={selectedWorkplace}
            />
          </>
        ) : null}
      </Wrapper>
      {selectedDay !== '' ? (
        <WrapperButtons>
          <StyledButton>Zapisz szablon</StyledButton>
          <StyledButton isCancel>Anuluj</StyledButton>
        </WrapperButtons>
      ) : null}
    </SchemaGraphDayContentWrapper>
  );
};

export default SchemaGraphDayContent;

SchemaGraphDayContent.propTypes = {
  selectedDay: PropTypes.string,
};
