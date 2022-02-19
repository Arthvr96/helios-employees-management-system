import React from 'react';
import PropTypes from 'prop-types';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import NavigationListUser from 'components/molecules/NavigationListUser/NavigationListUser';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { Wrapper, SignOutButton } from './HamburgerMenu.style';

const HamburgerMenu = ({ isOpen, handleCloseHamburger }) => {
  const { handleLogOut } = useGlobalState();
  return (
    <Wrapper isOpen={isOpen}>
      <ViewTemplate
        navMargin="0"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <NavigationListUser handleCloseHamburger={handleCloseHamburger} />
        <SignOutButton type="button" onClick={handleLogOut}>
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
