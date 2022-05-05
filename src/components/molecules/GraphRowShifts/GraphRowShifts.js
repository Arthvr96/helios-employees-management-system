import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import React from 'react';
import GraphShift from 'components/molecules/GraphShift/GraphShift';

const GraphRowShifts = ({ className, workplace, shiftIndex, schema }) => {
  const arr = new Array(7);
  arr.fill('x');

  return (
    <tr>
      {arr.map((_, i) => {
        const classFrom = `${className}-day${i + 1}-from`;
        const classTo = `${className}-day${i + 1}-to`;
        const classN = `${className}-day${i + 1}-name`;
        if (schema[`day${i + 1}`][workplace].shifts[shiftIndex]) {
          const shift = schema[`day${i + 1}`][workplace].shifts[shiftIndex];

          return (
            <GraphShift
              key={shift.id}
              from={`${shift.from}`}
              to={`${shift.to}`}
              className={classN}
              classFrom={classFrom}
              classTo={classTo}
            />
          );
        }
        return (
          <GraphShift key={uniqid()} className={classN} classFrom={classFrom} classTo={classTo} />
        );
      })}
    </tr>
  );
};

GraphRowShifts.propTypes = {
  className: PropTypes.string,
  workplace: PropTypes.string,
  shiftIndex: PropTypes.number,
  schema: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.arrayOf(
            PropTypes.shape({
              from: PropTypes.number,
              to: PropTypes.number,
              id: PropTypes.string,
            }),
          ),
        ]),
      ),
    ),
  ),
};

export default GraphRowShifts;
