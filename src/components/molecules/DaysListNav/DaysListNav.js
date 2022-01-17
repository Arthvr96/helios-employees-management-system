import React from 'react';
import PropTypes from 'prop-types';
import { DaysListWrapper, ButtonDay } from './DaysListNav.style';

const days = ['friday', 'saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
const dayspl = ['piątek', 'sobota', 'niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek'];

const DaysListNav = ({ selectedDay, setSelectedDay }) => {
  return (
    <DaysListWrapper>
      <ul>
        {days.map((day, i) => (
          <li key={day}>
            <ButtonDay isSelected={selectedDay === `${day}`} onClick={() => setSelectedDay(day)}>
              {dayspl[i]}
            </ButtonDay>
          </li>
        ))}
      </ul>
    </DaysListWrapper>
  );
};

export default DaysListNav;

DaysListNav.propTypes = {
  selectedDay: PropTypes.string,
  setSelectedDay: PropTypes.func,
};
