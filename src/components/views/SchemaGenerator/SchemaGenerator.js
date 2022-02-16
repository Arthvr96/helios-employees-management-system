import React, { useContext, useState } from 'react';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import SchemaGraphForm from 'components/organisms/SchemaGraphForm/SchemaGraphForm';
import SchemaGraphMenu from 'components/organisms/SchemaGrahpMenu/SchemaGraphMenu';
import SchemaCreatorDisabled from 'components/molecules/SchemaCreatorDisabled/SchemaCreatorDisabled';
// import { schema } from 'data/schema1';
import { Wrapper } from './SchemaGenerator.style';

const SchemaView = () => {
  const { cycleState } = useContext(AdminStateContext);
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
