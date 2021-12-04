import React from 'react';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import NewCycleWindow from 'components/organisms/NewCycleWindow/NewCycleWindow';
import ActiveCycleWindows from 'components/organisms/ActiveCycleWindows/ActiveCycleWindows';

const DashBoard = () => {
  return (
    <ViewTemplate>
      {/* <NewCycleWindow /> */}
      <ActiveCycleWindows />
    </ViewTemplate>
  );
};

export default DashBoard;
