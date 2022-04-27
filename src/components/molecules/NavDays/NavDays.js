import React from 'react';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Nav, DayButton } from './NavDays.style';

const days = [
  ['day1', 'Piątek'],
  ['day2', 'Sobota'],
  ['day3', 'Niedziela'],
  ['day4', 'Poniedzialek'],
  ['day5', 'Wtorek'],
  ['day6', 'Sroda'],
  ['day7', 'Czwartek'],
];

const NavDays = () => {
  const { selectedDay, handleSetSelectedDay } = useSchemaCreatorContext();

  return (
    <Nav>
      {days.map((day) => (
        <li key={day[0]}>
          <DayButton
            type="button"
            onClick={() => handleSetSelectedDay({ id: day[0], name: day[1] })}
            isSelected={selectedDay.id === day[0]}
          >
            {day[1]}
          </DayButton>
        </li>
      ))}
    </Nav>
  );
};

export default NavDays;
