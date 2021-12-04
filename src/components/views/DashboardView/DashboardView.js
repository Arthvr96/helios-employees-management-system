import React, { useContext } from 'react';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import { getDataForDashboard } from 'generatorGraph/helpers';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import DropList from 'components/organisms/DropList/DropList';
import { Wrapper } from './DashboardView.style';

const DashBoard = () => {
  const { employeesDispo } = useContext(AdminStateContext);
  const { arr, arr2, count, count2 } = getDataForDashboard(employeesDispo);

  return (
    <ViewTemplate>
      <Wrapper>
        <DropList
          className="dropList1"
          name="Pracownicy, którzy nie wysłali dyspo"
          listEmployees={arr}
          numberOfEmployees={count}
        />
        <DropList
          className="dropList2"
          name="Pracownicy, którzy wysłali dyspo"
          listEmployees={arr2}
          numberOfEmployees={count2}
        />
      </Wrapper>
    </ViewTemplate>
  );
};

export default DashBoard;
