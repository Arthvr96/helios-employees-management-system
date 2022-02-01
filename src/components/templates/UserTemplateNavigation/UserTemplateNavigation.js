import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HamburgerMenu from 'components/molecules/HamburgerMenu/HamburgerMenu';
import HamburgerButton from 'components/atoms/HamburgerButton/HamburgerButton';
import { Wrapper, NavigationWrapper, StyledLogoImg } from './UserTemplateNavigation.style';

const UserTemplateNavigation = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Wrapper>
      <NavigationWrapper>
        <NavLink to="/disposition">
          <StyledLogoImg />
        </NavLink>
        <HamburgerButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
      </NavigationWrapper>
      <HamburgerMenu isOpen={isOpen} handleCloseHamburger={() => setOpen(!isOpen)} />
      {children}
    </Wrapper>
  );
};

export default UserTemplateNavigation;

UserTemplateNavigation.propTypes = {
  children: PropTypes.node,
};
