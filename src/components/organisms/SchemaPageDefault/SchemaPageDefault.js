import React, { useState, useEffect } from 'react';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { Button } from 'components/atoms/Button/Button';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import { Wrapper, SubTitle, StyledTitle } from './SchemaPageDefault.style';

const options = ['Opcja nr 1', 'Opcja nr2'];

const SchemaPageDefault = () => {
  const { handleChangePage } = useSchemaCreatorContext();
  const [value, setValue] = useState('default');
  const [selectedSchema, setSchema] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSetSchema = () => {
    setSchema(value);
    setIsVisible(false);
  };

  useEffect(() => {
    if (value !== 'default' && value !== selectedSchema) {
      setIsVisible(true);
    } else if (value !== 'default' && value === selectedSchema) {
      setIsVisible(false);
    }
  }, [value, selectedSchema]);

  const { appState } = useGlobalState();
  const getDefault = () => {
    if (options.length && appState.state !== 'nonActive') {
      return 'Wybierz jakis szablon';
    }
    if (options.length && appState.state === 'nonActive') {
      return 'Rozpocznij nowy cykl';
    }
    return 'Nie utworzono jeszcze szablonu';
  };
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
        <StyledTitle>Wybrany szablon </StyledTitle>
        <InputSelect
          disabled={appState.state === 'nonActive'}
          value={value}
          handleChange={setValue}
          defaultOption={getDefault()}
          options={options}
          width="100%"
          margin="0.5rem 0 0 0"
        />
        {isVisible && (
          <Button margin="1rem 0 0 0" type="button" onClick={handleSetSchema}>
            Zapisz
          </Button>
        )}
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
