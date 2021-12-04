import React from 'react';
import { ArrowIcone } from 'components/atoms/ArowIcone/ArowIcone';
import {
  UserNavWrapper,
  User,
  UserInfoWrapper,
  UserName,
  UserRoleName,
  UserAvatar,
} from './SignedUpUser.style';

const SignedUpUser = () => {
  // TODO : add hover popup window with options for user

  return (
    <UserNavWrapper>
      <User>
        <UserInfoWrapper>
          <UserName>Łukasz Katyszeewski</UserName>
          <UserRoleName>Admin</UserRoleName>
        </UserInfoWrapper>
        <UserAvatar />
        <ArrowIcone isReversed />
      </User>
    </UserNavWrapper>
  );
};

export default SignedUpUser;
