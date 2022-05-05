import React, { useEffect, useState } from 'react';
import { GraphTh } from 'components/atoms/GraphTh/GraphTh';
import PropTypes from 'prop-types';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const GraphDaysHeader = ({ date }) => {
  const { getArrDays } = HeliosAppSdk.__helpers__;
  const [arrDates, setArrDates] = useState([]);

  useEffect(() => {
    const d1 = date.slice(0, 10);
    const d2 = date.slice(11, 21);
    const arr1 = getArrDays(d1, d2);
    const arr2 = arr1.map((el) => el.split(' ')[1].split('.'));
    const result = arr2.map((el) => `${el[1]} ${monthNames[el[0] - 1]}`);
    setArrDates(result);
  }, []);

  return (
    <thead>
      <tr>
        <GraphTh colSpan={3}>Piatek</GraphTh>
        <GraphTh isDark colSpan={3}>
          Sobota
        </GraphTh>
        <GraphTh isDark colSpan={3}>
          Niedziela
        </GraphTh>
        <GraphTh colSpan={3}>Poniedzialek</GraphTh>
        <GraphTh colSpan={3}>Wtorek</GraphTh>
        <GraphTh colSpan={3}>Sroda</GraphTh>
        <GraphTh colSpan={3}>Czwartek</GraphTh>
      </tr>
      <tr>
        {arrDates &&
          arrDates.map((el) => (
            <GraphTh key={el} size="xs" colSpan={3}>
              {el}
            </GraphTh>
          ))}
      </tr>
    </thead>
  );
};

export default GraphDaysHeader;

GraphDaysHeader.propTypes = {
  date: PropTypes.string.isRequired,
};
