import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import { StyledViewTemplate } from './LoginPanel.style';

const LoginPanel = () => {
  return (
    <StyledViewTemplate heightSize={useWindowSize().height}>
      <CardTemplate>
        <CardTitle>Logowanie</CardTitle>
        <LoginPanelForm />
      </CardTemplate>
    </StyledViewTemplate>
  );
};

export default LoginPanel;
