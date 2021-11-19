import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import TabShifts from 'components/molecues/TabShifts/TabShifts';
import { ShiftType } from './TableShifts.style';

const TableShifts = ({ shiftName, shiftId, maxShifts }) => {
  const arr = [];
  arr.length = 7;
  arr.fill(shiftName);

  return (
    <>
      <ShiftType>
        {arr.map((item) => (
          <td key={uniqid()}>{item}</td>
        ))}
      </ShiftType>
      <tr className="shifts">
        {arr.map((item, i) => (
          <TabShifts key={uniqid()} shiftId={shiftId} maxShifts={maxShifts} dayNumber={i} />
        ))}
      </tr>
    </>
  );
};

export default TableShifts;

TableShifts.propTypes = {
  shiftName: PropTypes.string,
  shiftId: PropTypes.string,
  maxShifts: PropTypes.number,
};
