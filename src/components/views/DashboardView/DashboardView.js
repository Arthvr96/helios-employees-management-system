import React from 'react';
import styled from 'styled-components';
import { ViewTemplate } from 'components/templates/ViewTemplate/ViewTemplate';
import NewCycleWindow from 'components/organisms/NewCycleWindow/NewCycleWindow';

const DashBoard = () => {
  return (
    <ViewTemplate>
      <NewCycleWindow />
    </ViewTemplate>
  );
};

export default DashBoard;
