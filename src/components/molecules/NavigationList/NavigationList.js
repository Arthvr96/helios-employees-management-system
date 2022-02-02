import React from 'react';
import { NavigationListWrapper, NavigationItem, StyledLink } from './NavigationList.style';

const LINKS = [
  ['dashboard', '/admin/dashboard'],
  ['szablon grafiku', '/admin/schemaView'],
  ['generator grafiku', '/admin/graphGeneratorView'],
  ['pracownicy', '/admin/employeesView'],
];

const NavigationList = () => {
  return (
    <NavigationListWrapper>
      {LINKS.map((link) => (
        <NavigationItem key={link[0]}>
          <StyledLink to={link[1]}>{link[0]}</StyledLink>
        </NavigationItem>
      ))}
    </NavigationListWrapper>
  );
};

export default NavigationList;
