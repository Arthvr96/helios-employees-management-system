import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from './LoaderRing.style';

const LoaderRing = ({ colorVariant2 }) => {
  return (
    <Loader colorVariant2={colorVariant2}>
      <div />
      <div />
      <div />
      <div />
    </Loader>
  );
};

export default LoaderRing;

LoaderRing.propTypes = {
  colorVariant2: PropTypes.bool,
};
