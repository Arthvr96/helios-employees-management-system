import React from 'react';
import PropTypes from 'prop-types';
import { WorkplacesListWrapper, ButtonWorkplace } from './WorkplacesList.style';

const workplaces = ['bar1', 'bar2', 'obs1', 'obs2', 'tickets', 'coffee'];
const workplacespl = ['bar 1', 'bar 2', 'obsługa 1', 'obsługa 2', 'kasa', 'kawiarnia'];

const WorkplacesList = ({ selectedWorkplace, setWorkplace }) => {
  return (
    <WorkplacesListWrapper>
      {workplaces.map((workplace, i) => (
        <li key={workplace}>
          <ButtonWorkplace
            isSelected={selectedWorkplace === `${workplace}`}
            onClick={() => setWorkplace(workplace)}
          >
            {workplacespl[i]}
          </ButtonWorkplace>
        </li>
      ))}
    </WorkplacesListWrapper>
  );
};

export default WorkplacesList;

WorkplacesList.propTypes = {
  selectedWorkplace: PropTypes.string,
  setWorkplace: PropTypes.func,
};
