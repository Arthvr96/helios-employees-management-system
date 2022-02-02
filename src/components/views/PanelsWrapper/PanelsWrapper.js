import React, { useEffect, Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';

const LoginPanel = lazy(() => import('components/views/LoginPanel/LoginPanel'));
const Site404 = lazy(() => import('components/templates/Site404/Site404'));
const AdminPanel = lazy(() => import('components/views/AdminPanel/AdminPanel'));
const UserPanel = lazy(() => import('components/views/UserPanel/UserPanel'));

const PanelsWrapper = () => {
  const { authUser, authAdmin, currentUser } = useAuth();
  const history = useHistory();

  const goToRoute = (routeName) => {
    history.push(routeName);
  };

  useEffect(() => {
    if (authAdmin && currentUser) {
      goToRoute('/admin/dashboard');
    }
    if (authUser && currentUser) {
      goToRoute('/user/disposition');
    }
    if (!authUser && !authAdmin && !currentUser) {
      goToRoute('/login');
    }
  }, [authUser, authAdmin, currentUser]);

  return (
    <Suspense fallback={<LoaderRing />}>
      <Switch>
        <Route exact path="/login">
          <LoginPanel />
        </Route>
        {authAdmin && currentUser ? <AdminPanel /> : null}
        {authUser && currentUser ? <UserPanel /> : null}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="*">
          <Site404 reDirect={() => goToRoute('/login')} />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default PanelsWrapper;
