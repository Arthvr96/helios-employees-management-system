import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';
import NewUserForm from 'components/organisms/NewUserForm/NewUserForm';
import ListUsers from 'components/organisms/ListUsers/ListUsers';

const links = [
  ['1', 'Stwórz nowe konto'],
  ['2', 'Lista kont użytkowników'],
];

const EmployeesView = () => {
  const [page, setPage] = useState('0');

  const handleSetPage = (nrPage) => {
    if (page === nrPage) {
      setPage('0');
    } else if (page !== nrPage) {
      setPage(nrPage);
    }
  };

  return (
    <ViewTemplate flexDirection="column" alignItems="center" justifyContent="flex-start">
      <MenuSelectVisiblePanel handleClick={handleSetPage} state={page} links={links} />
      {page === '1' ? <NewUserForm /> : null}
      {page === '2' ? <ListUsers /> : null}
    </ViewTemplate>
  );
};

export default EmployeesView;
