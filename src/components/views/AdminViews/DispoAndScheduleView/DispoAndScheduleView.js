import React, { useState, useEffect } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';
import DispositionsArchive from 'components/organisms/DispositionsArchive/DispositionsArchive';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';

const links = [
  ['1', 'Wysłane dyspozycje'],
  ['2', 'Grafiki'],
];

const DispoAndScheduleView = () => {
  const [page, setPage] = useState('0');
  const { __handleGetDocs__ } = heliosAppSdk.__firestoreFunctionsPrivate__;
  const { users } = heliosAppSdk.firestoreConstants.paths;
  useEffect(() => {
    __handleGetDocs__(users, 'role', '==', 'user').then((r) => {
      const arr = [];
      r.forEach((el) => {
        arr.push(el.data());
      });
      console.log(arr);
      console.log(JSON.stringify(arr));
    });
  }, []);

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
    </ViewTemplate>
  );
};

export default DispoAndScheduleView;
