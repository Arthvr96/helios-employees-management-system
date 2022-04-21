import React, { useEffect, useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import SignInForm from 'components/organisms/SignInForm/SignInForm';
import ResetPasswordForm from 'components/organisms/ResetPasswordForm/ResetPasswordForm';
import { StyledTitle, Version, Copyrights, Wrapper, SignInWrapper } from './LoginPanel.style';

const LoginView = () => {
  const [isResetPassword, setResetPassword] = useState(false);
  const { authAdmin, authUser, handleLogOut } = useGlobalState();
  const { version } = HeliosAppSdk.appInfo;

  const handleChangePage = () => {
    setResetPassword(!isResetPassword);
  };

  useEffect(() => {
    if (authAdmin || authUser) {
      handleLogOut();
    }
  }, []);

  return (
    <ViewTemplate navMargin="0" alignItems="center">
      <CardTemplate>
        <Wrapper>
          <StyledTitle>{isResetPassword ? 'Zresetuj hasło' : 'Logowanie'}</StyledTitle>
          <SignInWrapper>
            {!isResetPassword && <SignInForm handleChangePage={handleChangePage} />}
            {isResetPassword && <ResetPasswordForm handleChangePage={handleChangePage} />}
          </SignInWrapper>
          <Version>{`v${version}`}</Version>
        </Wrapper>
      </CardTemplate>
      <Copyrights>
        © All rights reserved | <span>Created by Artur Chmielewski</span>
      </Copyrights>
    </ViewTemplate>
  );
};

export default LoginView;
