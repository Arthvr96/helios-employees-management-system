import React from 'react';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import PropTypes from 'prop-types';
import { GraphTdHours } from 'components/atoms/GraphTdHours/GraphTdHours';
import { GraphTdName } from 'components/atoms/GraphTdName/GraphTdName';

const GraphShift = ({ classFrom, classTo, className, from = '', to = '' }) => {
  const { getDisplayTime } = HeliosAppSdk.__helpers__;
  return (
    <>
      <GraphTdHours className={classFrom}>{from && getDisplayTime(from)}</GraphTdHours>
      <GraphTdHours className={classTo}>{from && getDisplayTime(to)}</GraphTdHours>
      <GraphTdName className={`aliasGraph ${className}`} />
    </>
  );
};

GraphShift.propTypes = {
  classFrom: PropTypes.string.isRequired,
  classTo: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
};

export default GraphShift;
