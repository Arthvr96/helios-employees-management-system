import React, { useEffect } from 'react';
import SchemaPageDefault from 'components/organisms/SchemaPageDefault/SchemaPageDefault';
import SchemaPageShapes from 'components/organisms/SchemaPageShapes/SchemaPageShapes';
import SchemaPageCreateShape from 'components/organisms/SchemaPageCreateShape/SchemaPageCreateShape';
import SchemaPageSchemaCreator from 'components/organisms/SchemaPageSchemaCreator/SchemaPageSchemaCreator';
import ArrowButton from 'components/molecules/ArrowButton/ArrowButton';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import LoadingScreen from 'components/molecules/LoadingScreen/LoadingScreen';
import { StyledCard } from './SchemaPage.style';

const SchemaPage = () => {
  const { schemaPage, handleChangePage, inProgress } = useSchemaCreatorContext();

  useEffect(() => {
    handleChangePage('goToMenu');
  }, []);

  return (
    <>
      <LoadingScreen isVisible={inProgress} />
      {schemaPage !== '3' ? (
        <StyledCard>
          {schemaPage !== '0' ? (
            <ArrowButton onClick={() => handleChangePage('goToMenu')} label="cofnij" />
          ) : null}
          {schemaPage === '0' ? <SchemaPageDefault /> : null}
          {schemaPage === '1' ? <SchemaPageShapes /> : null}
          {schemaPage === '2' ? <SchemaPageCreateShape /> : null}
        </StyledCard>
      ) : null}

      {schemaPage === '3' ? <SchemaPageSchemaCreator /> : null}
    </>
  );
};

export default SchemaPage;
