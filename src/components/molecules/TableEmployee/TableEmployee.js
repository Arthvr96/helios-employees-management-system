import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

const TableEmployee = ({ employee: { name, dispo } }) => {
  const days = Object.keys(dispo);

  useEffect(() => {});

  return (
    <tr>
      <td>{name}</td>
      {days.map((day, i) =>
        dispo[day].from === '8' && dispo[day].to === '24' ? (
          <td key={uniqid()} className={`dispoCell ${name.replace(' ', '')}${i}`}>
            C
          </td>
        ) : (
          <td
            key={uniqid()}
            className={`dispoCell ${name.replace(' ', '')}${i}`}
          >{`${dispo[day].from}-${dispo[day].to}`}</td>
        ),
      )}
    </tr>
  );
};

export default TableEmployee;

TableEmployee.propTypes = {
  employee: PropTypes.shape({
    name: PropTypes.string,
    dispo: PropTypes.objectOf(
      PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
        where: PropTypes.bool,
      }),
    ),
  }),
};
