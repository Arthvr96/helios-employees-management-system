import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

const TableEmployee = ({ employee: { name, dyspo, shift } }) => {
  const days = Object.keys(dyspo);

  useEffect(() => {});

  return (
    <tr>
      <td>{name}</td>
      {days.map((day, i) =>
        dyspo[day].from === '8' && dyspo[day].to === '24' ? (
          <td key={uniqid()} className={`dyspoCell ${name.replace(' ', '')}${i}`}>
            C
          </td>
        ) : (
          <td
            key={uniqid()}
            className={`dyspoCell ${name.replace(' ', '')}${i}`}
          >{`${dyspo[day].from}-${dyspo[day].to}`}</td>
        ),
      )}
    </tr>
  );
};

export default TableEmployee;

TableEmployee.propTypes = {
  employee: PropTypes.shape({
    name: PropTypes.string,
    dyspo: PropTypes.objectOf(
      PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
        where: PropTypes.bool,
      }),
    ),
    shift: PropTypes.objectOf(PropTypes.array),
  }),
};
