import React, { useState } from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import EmployeesManagmentMenu from 'components/molecules/EmployeesManagementMenu/EmployeesManagementMenu';
import NewUserForm from 'components/organisms/NewUserForm/NewUserForm';
import ListUsers from 'components/organisms/ListUsers/ListUsers';

const EmployeesView = () => {
  const [state, setState] = useState('');

  const handleClick = (name) => {
    if (state === name) {
      setState('');
    } else if (state !== name) {
      setState(name);
    }
  };

  return (
    <ViewTemplate>
      <CardTemplate>
        <EmployeesManagmentMenu handleClick={handleClick} state={state} />
        {state === 'new' ? <NewUserForm /> : null}
        {state === 'list' ? <ListUsers /> : null}
      </CardTemplate>
    </ViewTemplate>
  );
};

export default EmployeesView;
