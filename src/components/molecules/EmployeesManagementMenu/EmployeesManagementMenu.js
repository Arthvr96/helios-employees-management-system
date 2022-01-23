import React from 'react';
import { CardNavButton } from 'components/atoms/CardNavButton/CardNavButton';
import { CardNav } from 'components/atoms/CardNav/CardNav';
import PropTypes from 'prop-types';
import { SeparatorLine } from './EmployeesManagmentMenu.style';

const EmployeesManagementMenu = ({ state, handleClick }) => {
  return (
    <CardNav>
      <li>
        <CardNavButton
          onClick={() => {
            handleClick('new');
          }}
          isSelected={state === 'new'}
        >
          Stwórz nowe konto
        </CardNavButton>
      </li>
      <li>
        <CardNavButton
          onClick={() => {
            handleClick('list');
          }}
          isSelected={state === 'list'}
        >
          Lista kont użytkowników
        </CardNavButton>
      </li>
      {state && <SeparatorLine />}
    </CardNav>
  );
};

export default EmployeesManagementMenu;

EmployeesManagementMenu.propTypes = {
  state: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
