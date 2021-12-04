import React from 'react';
import {
  UserNavWrapper,
  User,
  UserInfoWrapper,
  UserName,
  UserRoleName,
  UserAvatar,
  StyledArrow,
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
        <StyledArrow />
      </User>
    </UserNavWrapper>
  );
};

export default SignedUpUser;
