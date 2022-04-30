import PropTypes from 'prop-types';
import React from 'react';
import { GraphTh } from 'components/atoms/GraphTh/GraphTh';

const GraphWorkplace = ({ name }) => {
  const arr = new Array(7);
  for (let i = 0; i < 7; i += 1) {
    arr.push(`${name}${i}`);
  }

  return (
    <tr>
      {arr.map((el) => (
        <GraphTh key={el} as="td" isDark colSpan={3}>
          {name}
        </GraphTh>
      ))}
    </tr>
  );
};

GraphWorkplace.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GraphWorkplace;
