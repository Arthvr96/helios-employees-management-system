import React from 'react';
import { useWindowSize } from 'hooks/useWindowSize';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import { StyledViewTemplate } from './LoginPanel.style';

const LoginPanel = () => {
  return (
    <StyledViewTemplate heightSize={useWindowSize().height}>
      <InterfaceWindowTemplate>
        <InterfaceWindowTitle>Logowanie</InterfaceWindowTitle>
        <LoginPanelForm />
      </InterfaceWindowTemplate>
    </StyledViewTemplate>
  );
};

export default LoginPanel;
