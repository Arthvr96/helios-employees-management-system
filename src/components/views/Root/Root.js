import React from 'react';
import Providers from 'components/templates/Providers/Providers';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import LoginPanel from 'components/views/LoginPanel/LoginPanel';
import AdminPanel from 'components/views/AdminPanel/AdminPanel';
import UserPanel from 'components/views/UserPanel/UserPanel';

const Root = () => {
  const { authUser, authAdmin, currentUser } = useAuth();

  return (
    <Providers>
      {!authAdmin && !authUser ? <LoginPanel /> : null}
      {(authUser || authAdmin) && !currentUser ? (
        <ViewTemplate navMarginDisabled alignItems="center">
          <LoaderRing />
        </ViewTemplate>
      ) : null}
      {authAdmin && currentUser ? <AdminPanel /> : null}
      {authUser && currentUser ? <UserPanel /> : null}
    </Providers>
  );
};

export default Root;
