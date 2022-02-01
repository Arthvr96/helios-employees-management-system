import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './HamburgerButton.style';

const HamburgerButton = ({ onClick, isOpen }) => {
  return (
    <Button onClick={onClick} isOpen={isOpen}>
      <div />
    </Button>
  );
};

export default HamburgerButton;

HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
