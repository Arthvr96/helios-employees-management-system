import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';
import SchemaPage from 'components/organisms/SchemaPage/SchemaPage';

const links = [
  ['1', 'Szablony'],
  ['2', 'Grafik'],
];

const ScheduleGeneratorView = () => {
  const [page, setPage] = useState('0');

  const handleSetPage = (nrPage) => {
    if (page === nrPage) {
      setPage('0');
    } else if (page !== nrPage) {
      setPage(nrPage);
    }
  };
  return (
    <ViewTemplate alignItems="center" flexDirection="column" justifyContent="flex-start">
      <MenuSelectVisiblePanel links={links} state={page} handleClick={handleSetPage} />
      {page === '1' ? <SchemaPage /> : null}
    </ViewTemplate>
  );
};

export default ScheduleGeneratorView;
