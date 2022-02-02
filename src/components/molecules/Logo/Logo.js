import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoImg } from 'components/atoms/LogoImg/LogoImg';
import { LogoWrapper } from './Logo.style';

const Logo = () => {
  return (
    <NavLink to="/admin/dashboard">
      <LogoWrapper>
        <LogoImg>Helios</LogoImg>
      </LogoWrapper>
    </NavLink>
  );
};

export default Logo;
