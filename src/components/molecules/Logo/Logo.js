import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoWrapper, LogoIcone } from './Logo.style';

const Logo = () => {
  return (
    <NavLink to="/">
      <LogoWrapper>
        <LogoIcone>Helios</LogoIcone>
      </LogoWrapper>
    </NavLink>
  );
};

export default Logo;
