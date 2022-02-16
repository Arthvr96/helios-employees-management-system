import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';
import DispositionsArchive from 'components/organisms/DispositionsArchive/DispositionsArchive';

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
    <ViewTemplate flexDirection="column" alignItems="center" justifyContent="flex-start">
      <MenuSelectVisiblePanel links={links} state={page} handleClick={handleSetPage} />
      {page === '1' ? <DispositionsArchive /> : null}
    </ViewTemplate>
  );
};

export default DispoAndScheduleView;
