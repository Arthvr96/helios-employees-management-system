import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './WrapperClickableEl.style';

const WrapperClickableEl = ({ children, isDisabled }) => {
  return (
    <ButtonWrapper
      type="button"
      disabled={isDisabled}
      isDisabled={isDisabled}
      onClick={(e) => {
        const input = e.target.querySelector('.clickable');
        if (input) {
          input.click();
        }
      }}
    >
      {children}
    </ButtonWrapper>
  );
};

export default WrapperClickableEl;

WrapperClickableEl.propTypes = {
  isDisabled: PropTypes.bool,
  children: PropTypes.node,
};
