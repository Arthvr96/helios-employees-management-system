import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import ScheduleGenerator from 'components/views/ScheduleGenerator/ScheduleGenerator';
import SchemaGenerator from 'components/views/SchemaGenerator/SchemaGenerator';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';

const links = [
  ['1', 'Creator szablonu grafiku'],
  ['2', 'Generator grafiku'],
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
      {page === '1' ? <SchemaGenerator /> : null}
      {page === '2' ? <ScheduleGenerator /> : null}
    </ViewTemplate>
  );
};

export default ScheduleGeneratorView;
