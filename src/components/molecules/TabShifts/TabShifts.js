import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { Table, Shifts } from './TabShifts.style';

const TabShifts = ({ shiftId, maxShifts, dayNumber }) => {
  const arr2 = [];
  if (maxShifts > -1) {
    arr2.length = maxShifts + 1;
    arr2.fill('cell');
  }

  return (
    <td>
      <Table>
        <tbody>
          {arr2.map((item, i) => (
            <Shifts className={`row${i}`} key={uniqid()}>
              <td className={`shiftCell ${item}-${dayNumber}-${shiftId}-${i}-0`}>.</td>
              <td className={`shiftCell ${item}-${dayNumber}-${shiftId}-${i}-1`}>.</td>
              <td className={`shiftCell ${item}-${dayNumber}-${shiftId}-${i}-2`}>.</td>
            </Shifts>
          ))}
        </tbody>
      </Table>
    </td>
  );
};

export default TabShifts;

TabShifts.propTypes = {
  shiftId: PropTypes.string,
  maxShifts: PropTypes.number,
  dayNumber: PropTypes.number,
};
