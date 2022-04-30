import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import MenuSelectVisiblePanel from 'components/molecules/EmployeesManagementMenu/MenuSelectVisiblePanel';
import SchemaPage from 'components/organisms/SchemaPage/SchemaPage';
import GraphPage from 'components/organisms/GraphPage/GraphPage';
import DispoTableWindow from 'components/organisms/DispoTableWindow/DispoTableWindow';
import { dispo1 } from 'mocks/dispo';
import { StyledButton, DispoWrapper, ScrollWrapper } from './ScheduleGeneratorView.style';

const links = [
  ['1', 'Szablony'],
  ['2', 'Grafik'],
];

const days = {
  day1: true,
  day2: true,
  day3: true,
  day4: true,
  day5: true,
  day6: true,
  day7: true,
};

const ScheduleGeneratorView = () => {
  const [page, setPage] = useState('0');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const data = Object.values(dispo1.body);

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
      padding="2.5rem 5rem 0 5rem"
    >
      <MenuSelectVisiblePanel links={links} state={page} handleClick={handleSetPage} />
      {page === '1' ? <SchemaPage /> : null}
      {page === '2' ? (
        <>
          <StyledButton isLeft onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '<' : '>'}
          </StyledButton>
          <StyledButton onClick={() => setIsOpen2(!isOpen2)}>{isOpen2 ? '>' : '<'}</StyledButton>
          <DispoWrapper isVisible={isOpen} isLeft isOpen={isOpen}>
            <DispoTableWindow
              selectedCycle="test"
              selectedDispo={data}
              handleShowMsg={() => {}}
              workDaysValues={days}
              margin="0"
              isShowCase
            />
          </DispoWrapper>
          <DispoWrapper isVisible={isOpen2} isOpen={isOpen2}>
            <DispoTableWindow
              selectedCycle="test"
              selectedDispo={data}
              handleShowMsg={() => {}}
              workDaysValues={days}
              margin="0"
              isShowCase
            />
          </DispoWrapper>
          <ScrollWrapper>
            <GraphPage />
          </ScrollWrapper>
        </>
      ) : null}
    </ViewTemplate>
  );
};

export default ScheduleGeneratorView;
