import React, { useContext } from 'react';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import NewCycleWindow from 'components/organisms/NewCycleWindow/NewCycleWindow';
import ActiveCycleWindows from 'components/organisms/ActiveCycleWindows/ActiveCycleWindows';
import DyspoSendBlockedWindow from 'components/organisms/DyspoSendBlockedWindow/DyspoSendBlockedWindow';
import { GlobalStateContext } from 'providers/GlobalStateProvider/GlobalStateProvider';

const DashBoard = () => {
  const { cycleState } = useContext(GlobalStateContext);
  return (
    <ViewTemplate>
      {cycleState === 'new' ? <NewCycleWindow /> : null}
      {cycleState === 'active' ? <ActiveCycleWindows /> : null}
      {cycleState === 'blocked' ? <DyspoSendBlockedWindow /> : null}
    </ViewTemplate>
  );
};

export default DashBoard;
