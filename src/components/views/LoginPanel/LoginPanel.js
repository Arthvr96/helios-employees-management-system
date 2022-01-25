import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import LoginPanelForm from 'components/organisms/LoginPanelForm/LoginPanelForm';
import { StyledTitle } from './LoginPanel.style';

const LoginPanel = () => {
  return (
    <Switch>
      <Route exact path="/signin">
        <ViewTemplate navMarginDisabled alignItems="center">
          <CardTemplate>
            <StyledTitle>Logowanie</StyledTitle>
            <LoginPanelForm />
          </CardTemplate>
        </ViewTemplate>
      </Route>
      <Route path="*">
        <Redirect to="/signin" />
      </Route>
    </Switch>
  );
};

export default LoginPanel;
