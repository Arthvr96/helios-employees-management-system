import React, { useEffect, useState } from 'react';
import BlockDispoSendingWindow from 'components/molecules/BlockDispoSendingWindow/BlockDispoSendingWindow';
import { useAdminContext } from 'providers/AdminStateProvider/AdminStateProvider';
import DropDownListWindow from '../DropDownListWindow/DropDownListWindow';
import { WrapperWindows, WrapperDropDownWindows } from './ActiveCycleWindows.style';

const titleDropDown1 = 'Pracownicy, którzy nie wysłali dyspo';
const titleDropDown2 = 'Pracownicy, którzy wysłali dyspo';

const ActiveCycleWindows = () => {
  const [peopleWhoSendDispo, setPeopleWhoSendDispo] = useState(null);
  const [peopleWhoDontSendDispo, setList2] = useState(null);
  const { dispoSendInfo } = useAdminContext();

  useEffect(() => {
    // Sorting on employees who sent and didn't send disposition
    const sortingEmployees = () => {
      if (dispoSendInfo) {
        const list1 = [];
        const list2 = [];
        for (const key in dispoSendInfo) {
          if (dispoSendInfo[key].status) {
            list1.push(dispoSendInfo[key].info);
          } else if (!dispoSendInfo[key].status) {
            list2.push(dispoSendInfo[key].info);
          }
        }
        setPeopleWhoSendDispo([...list1]);
        setList2([...list2]);
      }
    };
    sortingEmployees();
  }, [dispoSendInfo]);

  return (
    <WrapperWindows>
      <BlockDispoSendingWindow />
      <WrapperDropDownWindows>
        {peopleWhoDontSendDispo ? (
          <DropDownListWindow title={titleDropDown1} data={peopleWhoDontSendDispo} />
        ) : null}
        {peopleWhoSendDispo ? (
          <DropDownListWindow title={titleDropDown2} data={peopleWhoSendDispo} />
        ) : null}
      </WrapperDropDownWindows>
    </WrapperWindows>
  );
};

export default ActiveCycleWindows;
