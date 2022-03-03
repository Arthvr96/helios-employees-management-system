import React from 'react';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import { useWindowSize } from 'hooks/useWindowSize';
import PropTypes from 'prop-types';
import { Wrapper } from './LoadingScreen.style';

const LoadingScreen = ({ isVisible }) => {
  const { width, height } = useWindowSize();
  return (
    <Wrapper isVisible={isVisible} widthSize={width} heightSize={height}>
      <LoaderRing />
    </Wrapper>
  );
};

export default LoadingScreen;

LoadingScreen.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
