import React from 'react';
import Logo from 'components/molecues/Logo/Logo';
import { GearOptions } from 'components/atoms/GearOptions/GearOptions';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { NavigationWrapper, LinkItem, StyledLink, ListLinks } from './Navigation.style';

const LogoutButton = styled.button``;

const Navigation = () => {
  const auth = getAuth();
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
        <LinkItem>
          <LogoutButton onClick={() => auth.signOut()}>Logout</LogoutButton>
        </LinkItem>
      </ListLinks>
      <GearOptions />
    </NavigationWrapper>
  );
};

export default Navigation;
