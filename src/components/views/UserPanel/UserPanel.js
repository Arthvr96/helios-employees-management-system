import React from 'react';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { InterfaceWindowSubTitle } from 'components/atoms/InterfaceWindowSubTitle/InterfaceWindowSubTitle';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

const UserPanel = () => {
  const { logOut } = useAuth();
  return (
    <ViewTemplate>
      <InterfaceWindowTemplate>
        <InterfaceWindowTitle>User Panel</InterfaceWindowTitle>
        <InterfaceWindowSubTitle>hi user</InterfaceWindowSubTitle>
        <SubmitButton type="button" onClick={logOut}>
          Logout
        </SubmitButton>
      </InterfaceWindowTemplate>
    </ViewTemplate>
  );
};

export default UserPanel;
