import React, { useEffect } from 'react';
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
  const { handleSetWorkplace, selectedWorkplace, selectedDay, schemaData } =
    useSchemaCreatorContext();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.shiftKey && e.keyCode - 49 >= 0 && e.keyCode - 49 <= 6) {
        handleSetWorkplace({
          id: workplaces[e.keyCode - 49][0],
          name: workplaces[e.keyCode - 49][1],
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <Nav>
      {workplaces.map((workplace) => (
        <li key={workplace[0]}>
          <StyledButton
            type="button"
            isActive={schemaData[selectedDay.id][workplace[0]].isActive}
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
