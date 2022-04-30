import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';
import DispositionsArchive from 'components/organisms/DispositionsArchive/DispositionsArchive';
import GraphsArchive from 'components/molecules/GraphsArchive/GraphsArchive';

const links = [
  ['1', 'Wysłane dyspozycje'],
  ['2', 'Grafiki'],
];

const DispoAndScheduleView = () => {
  const [page, setPage] = useState('2');

  const handleSetPage = (nrPage) => {
    if (page === nrPage) {
      setPage('0');
    } else if (page !== nrPage) {
      setPage(nrPage);
    }
  };

  return (
    <ViewTemplate
      minWidth="1150px"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <MenuSelectVisiblePanel links={links} state={page} handleClick={handleSetPage} />
      {page === '1' ? <DispositionsArchive /> : null}
      {page === '2' ? <GraphsArchive /> : null}
    </ViewTemplate>
  );
};

export default DispoAndScheduleView;
