import React from 'react';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

const UserPanel = () => {
  const { logOut } = useAuth();
  return (
    <ViewTemplate>
      <CardTemplate>
        <CardTitle>User Panel</CardTitle>
        <CardSubtitle>hi user</CardSubtitle>
        <SubmitButton type="button" onClick={logOut}>
          Logout
        </SubmitButton>
      </CardTemplate>
    </ViewTemplate>
  );
};

export default UserPanel;
