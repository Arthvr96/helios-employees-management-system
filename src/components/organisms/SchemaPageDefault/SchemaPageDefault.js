import React from 'react';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Wrapper, SubTitle, StyledTitle } from './SchemaPageDefault.style';

const SchemaPageDefault = () => {
  const { appState } = useGlobalState();
  const { handleChangePage } = useSchemaCreatorContext();

  return (
    <div>
      <CardTitle fontSize="m">Szablony</CardTitle>
      <Wrapper>
        <StyledTitle>Obecny cykl: </StyledTitle>
        <SubTitle>
          {appState.state !== 'nonActive'
            ? `${appState.date1} - ${appState.date2}`
            : 'Rozpocznij nowy cykl'}
        </SubTitle>
      </Wrapper>

      <SubmitButton
        margin="2rem 0 1rem 0"
        type="button"
        onClick={() => handleChangePage('goToShapes')}
      >
        Szablony
      </SubmitButton>
      <SubmitButton margin="0" type="button" onClick={() => handleChangePage('goToCreateShape')}>
        Utworz nowy szablon
      </SubmitButton>
    </div>
  );
};

export default SchemaPageDefault;
