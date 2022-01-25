import React from 'react';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import LoginPanel from 'components/views/LoginPanel/LoginPanel';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import LoaderRing from 'components/atoms/LoaderRing/LoaderRing';
import AdminStateProvider from 'providers/AdminStateProvider/AdminStateProvider';
import AdminPanel from 'components/views/AdminPanel/AdminPanel';
import UserPanel from 'components/views/UserPanel/UserPanel';

const PanelsWrapper = () => {
  const { authUser, authAdmin, currentUser } = useAuth();
  return (
    <>
      {!authAdmin && !authUser ? <LoginPanel /> : null}
      {/* comment to line 19 */}
      {/* While the user is not logged out and re-authorization is taking place e.g. f5 browser */}
      {/* (currentUser.exists = authorization) authAdmin or AuthUser will be true (see local storage). If re-authentication */}
      {/* fails localstorage.clear() (see authProvider()). */}
      {(authUser || authAdmin) && !currentUser ? (
        <ViewTemplate navMarginDisabled alignItems="center">
          <LoaderRing />
        </ViewTemplate>
      ) : null}
      {authAdmin && currentUser ? (
        <AdminStateProvider>
          <AdminPanel />
        </AdminStateProvider>
      ) : null}
      {authUser && currentUser ? <UserPanel /> : null}
    </>
  );
};

export default PanelsWrapper;
