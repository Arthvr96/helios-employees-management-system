import React, { useContext, useEffect, useState } from 'react';
import BlockDispoSendingWindow from 'components/molecules/BlockDispoSendingWindow/BlockDispoSendingWindow';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import DropDownListWindow from '../DropDownListWindow/DropDownListWindow';
import { WrapperWindows, WrapperDropDownWindows } from './ActiveCycleWindows.style';

const TITLEDROPDOWN1 = 'Pracownicy, którzy nie wysłali dyspo';
const TITLEDROPDOWN2 = 'Pracownicy, którzy wysłali dyspo';
const EMPLOYEES1 = new Array(5);
EMPLOYEES1.fill('x');
const EMPLOYEES2 = new Array(35);
EMPLOYEES2.fill('x');

const ActiveCycleWindows = () => {
  const [peopleWhoSendDyspo, setList1] = useState(null);
  const [peopleWhoDontSendDyspo, setList2] = useState(null);
  const { dispoSendInfo } = useContext(AdminStateContext);

  useEffect(() => {
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
      setList1([...list1]);
      setList2([...list2]);
    }
  }, [dispoSendInfo]);

  return (
    <WrapperWindows>
      <BlockDispoSendingWindow />
      <WrapperDropDownWindows>
        {peopleWhoDontSendDyspo ? (
          <DropDownListWindow title={TITLEDROPDOWN1} data={peopleWhoDontSendDyspo} />
        ) : null}
        {peopleWhoSendDyspo ? (
          <DropDownListWindow title={TITLEDROPDOWN2} data={peopleWhoSendDyspo} />
        ) : null}
      </WrapperDropDownWindows>
    </WrapperWindows>
  );
};

export default ActiveCycleWindows;
