import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 38px;
  height: 38px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 38px;
    height: 38px;
    border: 5px solid;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme, colorVariant2 }) =>
        colorVariant2 ? theme.colors.bg.primary : theme.colors.decors.white}
      transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

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