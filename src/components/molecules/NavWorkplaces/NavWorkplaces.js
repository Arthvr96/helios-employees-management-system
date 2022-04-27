import React from 'react';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Nav, StyledButton } from './NavWorkplaces.style';

const workplaces = [
  ['bar1', 'bar1'],
  ['bar2', 'bar2'],
  ['obs1', 'obs1'],
  ['obs2', 'obs2'],
  ['coffee', 'kawiarnia'],
  ['tickets', 'kasa'],
  ['help', 'pomoc'],
];

const NavWorkplaces = () => {
  const { handleSetWorkplace, selectedWorkplace } = useSchemaCreatorContext();

  return (
    <Nav>
      {workplaces.map((workplace) => (
        <li key={workplace[0]}>
          <StyledButton
            type="button"
            isSelected={workplace[0] === selectedWorkplace.id}
            onClick={() => handleSetWorkplace({ id: workplace[0], name: workplace[1] })}
          >
            {workplace[1]}
          </StyledButton>
        </li>
      ))}
    </Nav>
  );
};

export default NavWorkplaces;
