import React from 'react';
import PropTypes from 'prop-types';
import { NavLinks, StyledLink } from './NavigationListUser.style';

const LINKS = [
  ['Dyspozycja', '/user/disposition'],
  ['Grafik', '/user/schedule'],
  ['Moje godziny', '/user/hours'],
];

const NavigationListUser = ({ handleCloseHamburger }) => {
  return (
    <NavLinks>
      {LINKS.map((link) => (
        <li key={link[0]}>
          <StyledLink onClick={handleCloseHamburger} to={link[1]}>
            {link[0]}
          </StyledLink>
        </li>
      ))}
    </NavLinks>
  );
};

export default NavigationListUser;

NavigationListUser.propTypes = {
  handleCloseHamburger: PropTypes.func,
};
