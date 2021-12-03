import React, { useState } from 'react';
import SchemaGraphForm from 'components/organisms/SchemaGraphForm/SchemaGraphForm';
import SchemaGraphMenu from 'components/organisms/SchemaGrahpMenu/SchemaGraphMenu';
import { schema } from 'data/schema1';
import { Wrapper } from './SchemaView.style';

const SchemaView = () => {
  const [createSchema, setCreateSchema] = useState(false);

  const handleCreateSchema = (option) => {
    console.log(option);
    setCreateSchema(true);
  };

  return (
    <Wrapper>
      {!createSchema ? (
        <SchemaGraphMenu handleCreateSchema={handleCreateSchema} />
      ) : (
        <SchemaGraphForm setCreateSchema={setCreateSchema} />
      )}
    </Wrapper>
  );
};

export default SchemaView;
