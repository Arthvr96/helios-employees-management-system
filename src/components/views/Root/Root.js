import React from 'react';
import Providers from 'components/templates/Providers/Providers';
import AdminPanel from 'components/views/AdminPanel/AdminPanel';
import UserPanel from 'components/views/UserPanel/UserPanel';
import LoginPanel from 'components/views/LoginPanel/LoginPanel';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider/AuthProvider';

const Root = () => {
  const { authUser, authAdmin } = useAuth();

  return (
    <Providers>
      {!authAdmin && !authUser ? (
        <Switch>
          <Route exact path="/" component={LoginPanel} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : null}
      {authAdmin ? <AdminPanel /> : null}
      {authUser ? <UserPanel /> : null}
    </Providers>
  );
};

export default Root;
