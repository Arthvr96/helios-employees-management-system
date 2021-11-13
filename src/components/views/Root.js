import React from 'react';
import Providers from 'components/templates/Providers/Providers';
import AdminPanel from 'components/views/AdminPanel/AdminPanel';
import UserPanel from 'components/views/UserPanel/UserPanel';

const Root = () => {
  const authAdmin = true;
  const authUser = false;
  return (
    <Providers>
      {authAdmin ? <AdminPanel /> : null}
      {authUser ? <UserPanel /> : null}
    </Providers>
  );
};

export default Root;
