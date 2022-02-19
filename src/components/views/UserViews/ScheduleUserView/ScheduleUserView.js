import React from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';

const ScheduleUserView = () => {
  return (
    <ViewTemplate navMargin="40">
      <CardTemplate>
        <CardTitle>Grafik</CardTitle>
        <CardSubtitle>🚧 W budowie ! 🚧</CardSubtitle>
      </CardTemplate>
    </ViewTemplate>
  );
};

export default ScheduleUserView;
