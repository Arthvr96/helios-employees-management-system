import React, { useState } from 'react';
import SchemaGraphForm from 'components/organisms/SchemaGraphForm/SchemaGraphForm';
import SchemaGraphMenu from 'components/organisms/SchemaGrahpMenu/SchemaGraphMenu';
import SchemaCreatorDisabled from 'components/molecules/SchemaCreatorDisabled/SchemaCreatorDisabled';
// import { schema } from 'data/schema1';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { Wrapper } from './SchemaGenerator.style';

const SchemaView = () => {
  const { appState } = useAuth();
  const [createSchema, setCreateSchema] = useState(false);

  const handleCreateSchema = (option) => {
    setCreateSchema(true);
  };

  return (
    <Wrapper>
      {!createSchema && appState.state !== 'nonActive' ? (
        <SchemaGraphMenu handleCreateSchema={handleCreateSchema} />
      ) : null}
      {appState.state === 'nonActive' ? <SchemaCreatorDisabled /> : null}
      {createSchema ? <SchemaGraphForm setCreateSchema={setCreateSchema} /> : null}
    </Wrapper>
  );
};

export default SchemaView;
