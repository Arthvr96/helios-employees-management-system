import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'hooks/useWindowSize';
import { Wrapper } from './PopWrapper.style';

const PopupWrapper = ({ children, isVisible }) => {
  const { width, height } = useWindowSize();
  return (
    <Wrapper isVisible={isVisible} widthSize={width} heightSize={height}>
      {children}
    </Wrapper>
  );
};

export default PopupWrapper;

PopupWrapper.propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool.isRequired,
};
