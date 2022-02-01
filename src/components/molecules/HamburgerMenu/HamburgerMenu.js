import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import NavigationListUser from 'components/molecules/NavigationListUser/NavigationListUser';
import { Wrapper, SignOutButton } from './HamburgerMenu.style';

const HamburgerMenu = ({ isOpen, handleCloseHamburger }) => {
  const { logOut } = useAuth();
  return (
    <Wrapper isOpen={isOpen}>
      <ViewTemplate
        navMargin="0"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <NavigationListUser handleCloseHamburger={handleCloseHamburger} />
        <SignOutButton type="button" onClick={logOut}>
          Wyloguj
        </SignOutButton>
      </ViewTemplate>
    </Wrapper>
  );
};

export default HamburgerMenu;

HamburgerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseHamburger: PropTypes.func.isRequired,
};
