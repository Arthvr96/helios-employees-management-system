import React from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';

const ScheduleGeneratorView = () => {
  return (
    <ViewTemplate alignItems="center" flexDirection="column" justifyContent="flex-start">
      <CardTemplate>W budowie</CardTemplate>
    </ViewTemplate>
  );
};

export default ScheduleGeneratorView;
