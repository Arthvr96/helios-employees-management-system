import React from 'react';
import { GraphTh } from 'components/atoms/GraphTh/GraphTh';

const GraphDaysHeader = () => {
  return (
    <thead>
      <tr>
        <GraphTh colSpan={3}>Piatek</GraphTh>
        <GraphTh isDark colSpan={3}>
          Sobota
        </GraphTh>
        <GraphTh isDark colSpan={3}>
          Niedziela
        </GraphTh>
        <GraphTh colSpan={3}>Poniedzialek</GraphTh>
        <GraphTh colSpan={3}>Wtorek</GraphTh>
        <GraphTh colSpan={3}>Sroda</GraphTh>
        <GraphTh colSpan={3}>Czwartek</GraphTh>
      </tr>
      <tr>
        <GraphTh size="xs" colSpan={3}>
          29 Apr
        </GraphTh>
        <GraphTh size="xs" colSpan={3}>
          29 Apr
        </GraphTh>
        <GraphTh size="xs" colSpan={3}>
          1 May
        </GraphTh>
        <GraphTh size="xs" colSpan={3}>
          2 May
        </GraphTh>
        <GraphTh size="xs" colSpan={3}>
          3 May
        </GraphTh>
        <GraphTh size="xs" colSpan={3}>
          4 May
        </GraphTh>
        <GraphTh size="xs" colSpan={3}>
          5 May
        </GraphTh>
      </tr>
    </thead>
  );
};

export default GraphDaysHeader;
