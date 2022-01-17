import React, { useContext, useState } from 'react';
import SchemaGraphForm from 'components/organisms/SchemaGraphForm/SchemaGraphForm';
import SchemaGraphMenu from 'components/organisms/SchemaGrahpMenu/SchemaGraphMenu';
import { GlobalStateContext } from 'providers/GlobalStateProvider/GlobalStateProvider';
import SchemaCreatorDisabled from 'components/molecules/SchemaCreatorDisabled/SchemaCreatorDisabled';
import { schema } from 'data/schema1';
import { Wrapper } from './SchemaView.style';

const SchemaView = () => {
  const { cycleState } = useContext(GlobalStateContext);
  const [createSchema, setCreateSchema] = useState(false);

  const handleCreateSchema = (option) => {
    setCreateSchema(true);
  };

  return (
    <Wrapper>
      {!createSchema && cycleState !== 'new' ? (
        <SchemaGraphMenu handleCreateSchema={handleCreateSchema} />
      ) : null}
      {cycleState === 'blocked' ? <SchemaCreatorDisabled /> : null}
      {createSchema ? <SchemaGraphForm setCreateSchema={setCreateSchema} /> : null}
    </Wrapper>
  );
};

export default SchemaView;
