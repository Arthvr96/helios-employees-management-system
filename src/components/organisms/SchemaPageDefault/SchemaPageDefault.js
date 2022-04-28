import React, { useState, useEffect } from 'react';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { Button } from 'components/atoms/Button/Button';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { Wrapper, SubTitle, StyledTitle } from './SchemaPageDefault.style';

const SchemaPageDefault = () => {
  const { appState } = useGlobalState();
  const { handleChangePage, schemaShapesList, schemaShapesData, setInProgress } =
    useSchemaCreatorContext();
  const [value, setValue] = useState('default');
  const [selectedSchema, setSchema] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSetActualSelectedSchema = () => {
    const { updateCycleState } = HeliosAppSdk.appState;
    const schema = schemaShapesData.find((el) => el.id === value);
    setInProgress(true);
    updateCycleState({ graphShape: schema })
      .then(() => {
        setInProgress(false);
      })
      .catch((e) => {
        setInProgress(false);
        alert(e.code);
      });
    setSchema(value);
    setIsVisible(false);
  };

  const handleResetActualSelectedSchema = () => {
    const { updateCycleState } = HeliosAppSdk.appState;
    setInProgress(true);
    updateCycleState({ graphShape: { id: '', name: '', schema: {} } })
      .then(() => {
        setInProgress(false);
      })
      .catch((e) => {
        setInProgress(false);
        alert(e.code);
      });
    setSchema('');
    setValue('default');
    setIsVisible(false);
  };

  const getDefault = () => {
    if (schemaShapesList.length && appState.state !== 'nonActive') {
      return 'Wybierz jakis szablon';
    }
    if (schemaShapesList.length && appState.state === 'nonActive') {
      return 'Rozpocznij nowy cykl';
    }
    return 'Nie utworzono jeszcze szablonu';
  };

  useEffect(() => {
    if (value !== 'default' && value !== selectedSchema) {
      setIsVisible(true);
    } else if (value !== 'default' && value === selectedSchema) {
      setIsVisible(false);
    }
  }, [value, selectedSchema]);

  useEffect(() => {
    if (appState.graphShape.id) {
      setValue(appState.graphShape.id);
      setSchema(appState.graphShape.id);
    } else {
      setValue('default');
      setSchema('');
      setIsVisible(false);
    }
  }, []);

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
          options2={schemaShapesList}
          width="100%"
          margin="0.5rem 0 0 0"
        />
        {isVisible && (
          <Button margin="1rem 0 0 0" type="button" onClick={handleSetActualSelectedSchema}>
            Zapisz
          </Button>
        )}
        {!isVisible && selectedSchema && (
          <Button margin="1rem 0 0 0" type="button" onClick={handleResetActualSelectedSchema}>
            Reset
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
