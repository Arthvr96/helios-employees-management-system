import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'components/molecules/ToggleButton/ToggleButton';
import { Wrapper } from './WorkplacesSwitchersList.style';

const INITSTATE = {
  bar1: true,
  bar2: false,
  obs1: true,
  obs2: true,
  coffee: false,
  tickets: true,
  night: false,
};

const BUTTONS = [
  ['bar1', 'Bar1'],
  ['bar2', 'Bar2'],
  ['obs1', 'obs1'],
  ['obs2', 'obs2'],
  ['coffee', 'kawiarnia'],
  ['tickets', 'kasa'],
];

const WorkplacesSwitchersList = ({ getValues, initState, nightClose = true }) => {
  const [roles, setRoles] = useState(INITSTATE);

  useEffect(() => {
    if (initState) {
      setRoles({ ...initState });
    }
  }, [initState]);

  const handleSetRole = (roleName) => {
    setRoles({
      ...roles,
      [roleName]: !roles[roleName],
    });
  };

  useEffect(() => {
    getValues(roles);
  }, [roles]);

  return (
    <Wrapper>
      {BUTTONS.map((item) => (
        <li key={item[0]}>
          <span>{item[1]} :</span>
          <ToggleButton
            onClick={() => handleSetRole(item[0])}
            type="button"
            state={roles[item[0]]}
          />
        </li>
      ))}
      {nightClose ? (
        <li>
          <span>Zamkniecia:</span>
          <ToggleButton onClick={() => handleSetRole('night')} type="button" state={roles.night} />
        </li>
      ) : null}
    </Wrapper>
  );
};

export default WorkplacesSwitchersList;

WorkplacesSwitchersList.propTypes = {
  getValues: PropTypes.func.isRequired,
  nightClose: PropTypes.bool,
  initState: PropTypes.objectOf(PropTypes.bool),
};
