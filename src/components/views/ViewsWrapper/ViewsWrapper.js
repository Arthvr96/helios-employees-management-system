import React, { useEffect, Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import LoginView from 'components/views/LoginView/LoginView';
import Site404 from 'components/templates/Site404/Site404';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';

const AdminPanel = lazy(() => import('components/views/Panels/AdminPanel/AdminPanel'));
const UserPanel = lazy(() => import('components/views/Panels/UserPanel/UserPanel'));

const ViewsWrapper = () => {
  const { authUser, authAdmin, currentUser } = useGlobalState();
  const history = useHistory();

  const goToRoute = (routeName) => {
    history.push(routeName);
  };

  useEffect(() => {
    if (authAdmin && currentUser) {
      goToRoute('/admin/dashboard');
    }
    if (authUser && currentUser) {
      goToRoute('/user');
    }
    if (!authUser && !authAdmin && !currentUser) {
      goToRoute('/login');
    }
  }, [authUser, authAdmin, currentUser]);

  return (
    <Suspense
      fallback={
        <ViewTemplate alignItems="center" justifyContent="center">
          <LoaderRing />
        </ViewTemplate>
      }
    >
      <Switch>
        <Route exact path="/login">
          <LoginView />
        </Route>
        {authAdmin && currentUser && <AdminPanel />}
        {authUser && currentUser && <UserPanel />}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/404" />
        <Site404 reDirect={() => goToRoute('/login')} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default ViewsWrapper;
