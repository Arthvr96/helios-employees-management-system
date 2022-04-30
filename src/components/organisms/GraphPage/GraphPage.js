import React from 'react';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import GraphBody from 'components/organisms/GraphBody/GraphBody';
import GraphDaysHeader from 'components/molecules/GraphDaysHeader/GraphDaysHeader';
import { Table } from './GraphPage.style';

const GraphPage = () => {
  return (
    <CardTemplate>
      <Table>
        <GraphDaysHeader />
        <GraphBody />
      </Table>
    </CardTemplate>
  );
};

export default GraphPage;
