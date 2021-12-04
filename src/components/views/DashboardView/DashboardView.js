import React from 'react';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import NewCycleWindow from 'components/organisms/NewCycleWindow/NewCycleWindow';
import ActiveCycleWindows from 'components/organisms/ActiveCycleWindows/ActiveCycleWindows';
import DyspoSendBlockedWindow from 'components/organisms/DyspoSendBlockedWindow/DyspoSendBlockedWindow';

const DashBoard = () => {
  return (
    <ViewTemplate>
      {/* <NewCycleWindow /> */}
      {/* <ActiveCycleWindows /> */}
      <DyspoSendBlockedWindow />
    </ViewTemplate>
  );
};

export default DashBoard;
