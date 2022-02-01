import React from 'react';
import BlockDispoSendingWindow from 'components/molecules/BlockDispoSendingWindow/BlockDispoSendingWindow';
import DropDownListWindow from '../DropDownListWindow/DropDownListWindow';
import { WrapperWindows, WrapperDropDownWindows } from './ActiveCycleWindows.style';

const TITLEDROPDOWN1 = 'Pracownicy, którzy nie wysłali dyspo';
const TITLEDROPDOWN2 = 'Pracownicy, którzy wysłali dyspo';
const EMPLOYEES1 = new Array(5);
EMPLOYEES1.fill('x');
const EMPLOYEES2 = new Array(35);
EMPLOYEES2.fill('x');

const ActiveCycleWindows = () => {
  return (
    <WrapperWindows>
      <BlockDispoSendingWindow />
      <WrapperDropDownWindows>
        <DropDownListWindow title={TITLEDROPDOWN1} data={EMPLOYEES1} />
        <DropDownListWindow title={TITLEDROPDOWN2} data={EMPLOYEES2} />
      </WrapperDropDownWindows>
    </WrapperWindows>
  );
};

export default ActiveCycleWindows;
