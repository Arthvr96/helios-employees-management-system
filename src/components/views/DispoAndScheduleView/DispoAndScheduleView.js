import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';

const links = [
  ['1', 'Wysłane dyspozycje'],
  ['2', 'Grafiki'],
];

const DispoAndScheduleView = () => {
  const [page, setPage] = useState('0');

  const handleSetPage = (nrPage) => {
    if (page === nrPage) {
      setPage('0');
    } else if (page !== nrPage) {
      setPage(nrPage);
    }
  };

  return (
    <ViewTemplate>
      <MenuSelectVisiblePanel links={links} state={page} handleClick={handleSetPage} />
    </ViewTemplate>
  );
};

export default DispoAndScheduleView;
