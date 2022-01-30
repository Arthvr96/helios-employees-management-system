import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ToggleButtonNew from 'components/molecules/ToggleButtonNew/ToggleButtonNew';
import { Wrapper } from './WorkplacesSwitchersList.style';

const WorkplacesSwitchersList = ({ getValues, nightClose = true }) => {
  const [roles, setRoles] = useState({
    bar1: true,
    bar2: false,
    obs1: true,
    obs2: true,
    coffee: false,
    tickets: true,
    night: false,
  });

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
      <li>
        <span>Bar1 :</span>
        <ToggleButtonNew onClick={() => handleSetRole('bar1')} type="button" state={roles.bar1} />
      </li>
      <li>
        <span>Bar2 :</span>
        <ToggleButtonNew onClick={() => handleSetRole('bar2')} type="button" state={roles.bar2} />
      </li>
      <li>
        <span>Obs1 :</span>
        <ToggleButtonNew onClick={() => handleSetRole('obs1')} type="button" state={roles.obs1} />
      </li>
      <li>
        <span>Obs2 :</span>
        <ToggleButtonNew onClick={() => handleSetRole('obs2')} type="button" state={roles.obs2} />
      </li>
      <li>
        <span>Kawiarnia :</span>
        <ToggleButtonNew
          onClick={() => handleSetRole('coffee')}
          type="button"
          state={roles.coffee}
        />
      </li>
      <li>
        <span>Kasa :</span>
        <ToggleButtonNew
          onClick={() => handleSetRole('tickets')}
          type="button"
          state={roles.tickets}
        />
      </li>
      {nightClose ? (
        <li>
          <span>Zamkniecia obs :</span>
          <ToggleButtonNew
            onClick={() => handleSetRole('night')}
            type="button"
            state={roles.night}
          />
        </li>
      ) : null}
    </Wrapper>
  );
};

export default WorkplacesSwitchersList;

WorkplacesSwitchersList.propTypes = {
  getValues: PropTypes.func.isRequired,
  nightClose: PropTypes.bool,
};
