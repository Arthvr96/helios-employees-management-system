import React, { useState } from 'react';
import Providers from 'components/templates/Providers/Providers';
import AdminPanel from 'components/views/AdminPanel/AdminPanel';
import UserPanel from 'components/views/UserPanel/UserPanel';
import LoginPanel from 'components/views/LoginPanel/LoginPanel';

const Root = () => {
  const [authAdmin, setAuthAdmin] = useState(false);
  const [authUser, setAuthUser] = useState(false);

  return (
    <Providers>
      {!authAdmin && !authUser ? <LoginPanel /> : null}
      {authAdmin ? <AdminPanel /> : null}
      {authUser ? <UserPanel /> : null}
    </Providers>
  );
};

export default Root;
