import React from 'react';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import NavWorkplaces from 'components/molecules/NavWorkplaces/NavWorkplaces';
import WorkplaceContent from 'components/organisms/WorkplaceContent/WorkplaceContent';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Wrapper } from './DayContent.style';

const DayContent = () => {
  const { selectedDay, selectedWorkplace } = useSchemaCreatorContext();

  return (
    <Wrapper>
      <CardTitle margin="2rem 0 1rem 0">{selectedDay.name}</CardTitle>
      <NavWorkplaces />
      {selectedDay.id && selectedWorkplace.id && <WorkplaceContent />}
    </Wrapper>
  );
};

export default DayContent;
