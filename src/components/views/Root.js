import React, { useState } from 'react';
import Providers from 'components/templates/Providers/Providers';
import AdminPanel from 'components/views/AdminPanel/AdminPanel';
import UserPanel from 'components/views/UserPanel/UserPanel';

const Root = () => {
  const [authAdmin, setAuthAdmin] = useState(true);
  const [authUser, setAuthUser] = useState(false);

  return (
    <Providers>
      {authAdmin ? <AdminPanel /> : null}
      {authUser ? <UserPanel /> : null}
    </Providers>
  );
};

export default Root;
