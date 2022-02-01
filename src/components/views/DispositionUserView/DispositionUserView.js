import React from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';

const DispositionUserView = () => {
  return (
    <ViewTemplate navMargin="40">
      <CardTemplate>
        <CardTitle>Dyspozycja</CardTitle>
        <CardSubtitle>hi user</CardSubtitle>
      </CardTemplate>
    </ViewTemplate>
  );
};

export default DispositionUserView;
