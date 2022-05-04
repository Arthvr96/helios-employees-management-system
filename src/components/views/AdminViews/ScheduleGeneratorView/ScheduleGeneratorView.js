import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';
import SchemaPage from 'components/organisms/SchemaPage/SchemaPage';
import GraphPage from 'components/organisms/GraphPage/GraphPage';

const links = [
  ['1', 'Szablony'],
  ['2', 'Grafik'],
];

const ScheduleGeneratorView = () => {
  const [isHidden, setHidden] = useState(false);
  const [page, setPage] = useState('0');

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
      overflow="hidden"
      padding={isHidden ? '3rem 5rem 0 5rem' : '2.5rem 5rem 0 5rem'}
    >
      {!isHidden && (
        <MenuSelectVisiblePanel links={links} state={page} handleClick={handleSetPage} />
      )}
      {page === '1' ? <SchemaPage /> : null}
      {page === '2' ? <GraphPage isHidden={isHidden} setHidden={setHidden} /> : null}
    </ViewTemplate>
  );
};

export default ScheduleGeneratorView;
