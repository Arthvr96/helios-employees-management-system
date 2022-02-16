import React, { useState } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import ScheduleGenerator from 'components/views/ScheduleGenerator/ScheduleGenerator';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import SchemaGenerator from 'components/views/SchemaGenerator/SchemaGenerator';
import { Button } from 'components/atoms/Button/Button';

const ScheduleGeneratorView = () => {
  const [page, setPage] = useState(0);

  const handleSetPage = (number) => {
    if (number !== page) {
      setPage(number);
    } else {
      setPage(0);
    }
  };
  return (
    <ViewTemplate alignItems="center" flexDirection="column" justifyContent="flex-start">
      <CardTemplate flexDirection="row">
        <Button margin="0 1rem 0 0" type="button" onClick={() => handleSetPage(1)}>
          Creator schematów grafiku
        </Button>
        <Button type="button" onClick={() => handleSetPage(2)}>
          Generator grafiku
        </Button>
      </CardTemplate>
      {page === 1 ? <SchemaGenerator /> : null}
      {page === 2 ? <ScheduleGenerator /> : null}
    </ViewTemplate>
  );
};

export default ScheduleGeneratorView;
