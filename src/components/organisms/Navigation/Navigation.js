import React from 'react';
import Logo from 'components/molecules/Logo/Logo';
import NavigationList from 'components/molecules/NavigationList/NavigationList';
import SignedUpUser from 'components/organisms/SignedUpUser/SignedUpUser';
import { NavigationWrapper } from './Navigation.style';

const Navigation = () => {
  return (
    <NavigationWrapper>
      <Logo />
      <NavigationList />
      <SignedUpUser />
    </NavigationWrapper>
  );
};

export default Navigation;
