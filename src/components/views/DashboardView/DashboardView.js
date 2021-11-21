import React, { useContext } from 'react';
import DropList from 'components/organisms/DropList/DropList';
import { getDataForDashboard } from 'generatorGraph/helpers';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import { Wrapper } from './DashboardView.style';

const DashBoard = () => {
  const { employeesDispo } = useContext(AdminStateContext);
  const { arr, arr2, count, count2 } = getDataForDashboard(employeesDispo);

  return (
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
  );
};

export default DashBoard;
