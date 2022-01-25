import React, { useEffect, useState } from 'react';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { ArrowIcone } from 'components/atoms/ArowIcone/ArowIcone';
import {
  UserNavWrapper,
  User,
  UserInfoWrapper,
  UserName,
  UserRoleName,
  UserAvatar,
  UserMenu,
  LinkButton,
} from './SignedUpUser.style';

const SignedUpUser = () => {
  const [isOpen, setOpen] = useState(false);
  const { currentUser, logOut } = useAuth();

  return (
    <UserNavWrapper className="signedUpUser">
      <User onClick={() => setOpen(!isOpen)}>
        <UserInfoWrapper>
          <UserName>{currentUser && currentUser.displayName}</UserName>
          <UserRoleName>admin</UserRoleName>
        </UserInfoWrapper>
        <UserAvatar />
        <ArrowIcone isRotate={isOpen} isReversed />
      </User>
      <UserMenu isOpen={isOpen}>
        <div>
          <LinkButton type="button">Ustawienia</LinkButton>
          <LinkButton type="button" onClick={logOut}>
            Wyloguj
          </LinkButton>
        </div>
      </UserMenu>
    </UserNavWrapper>
  );
};

export default SignedUpUser;
