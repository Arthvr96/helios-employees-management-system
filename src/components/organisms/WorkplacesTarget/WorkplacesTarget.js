import React from 'react';
import PropTypes from 'prop-types';
import WorkplaceForm from 'components/organisms/WorkplaceForm/WorkplaceForm';
import { Wrapper } from './WorkplacesTarget.style';

const workplaces = ['bar1', 'bar2', 'obs1', 'obs2', 'tickets', 'coffee'];
const workplacespl = ['bar 1', 'bar 2', 'obsługa 1', 'obsługa 2', 'kasa', 'kawiarnia'];

const WorkplacesTarget = ({ schema, selectedDay, selectedWorkplace }) => {
  return (
    <Wrapper runAnimation={!(selectedWorkplace === '')} isVisible={!(selectedWorkplace === '')}>
      {workplaces.map((workplace, i) =>
        selectedWorkplace === workplace ? (
          <WorkplaceForm
            key={workplace}
            selectedWorkplace={selectedWorkplace}
            workplacespl={workplacespl[i]}
            selectedDay={selectedDay}
            schema={schema}
          />
        ) : null,
      )}
    </Wrapper>
  );
};

export default WorkplacesTarget;

WorkplacesTarget.propTypes = {
  schema: PropTypes.objectOf(
    PropTypes.shape({
      isActive: PropTypes.bool,
      schemaBody: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  selectedDay: PropTypes.string,
  selectedWorkplace: PropTypes.string,
};
