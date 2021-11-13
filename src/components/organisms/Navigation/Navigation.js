import React from 'react';
import Logo from 'components/molecues/Logo/Logo';
import { GearOptions } from 'components/atoms/GearOptions/GearOptions';
import { NavigationWrapper, LinkItem, StyledLink, ListLinks } from './Navigation.style';

const Navigation = () => {
  return (
    <NavigationWrapper>
      <Logo />
      <ListLinks>
        <LinkItem>
          <StyledLink to="/Dashboard">Dashboard</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/schemaView">Szablon grafiku</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/graphGeneratorView">Generator grafiku</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/employeesView">Pracownicy</StyledLink>
        </LinkItem>
      </ListLinks>
      <GearOptions />
    </NavigationWrapper>
  );
};

export default Navigation;
