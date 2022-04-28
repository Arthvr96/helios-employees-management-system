import React, { useEffect, useState } from 'react';
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
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.shiftKey && e.keyCode === 37) {
        if (counter === null) {
          setCounter(1);
        } else if (counter > 1) {
          setCounter(counter - 1);
        }
      }
      if (e.shiftKey && e.keyCode === 39) {
        if (counter === null) {
          setCounter(7);
        } else if (counter < 7) {
          setCounter(counter + 1);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [counter]);

  useEffect(() => {
    if (counter) {
      handleSetSelectedDay({ id: days[counter - 1][0], name: days[counter - 1][1] });
    }
  }, [counter]);

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
