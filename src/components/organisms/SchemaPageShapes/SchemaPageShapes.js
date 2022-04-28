import React, { useState } from 'react';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { Button } from 'components/atoms/Button/Button';
import { useSchemaCreatorContext } from 'providers/SchemaCreatorProvider/SchemaCreatorProvider';
import PopupConfirm from 'components/molecules/PopupConfirm/PopupConfirm';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';
import { WrapperButtons } from './SchemaPageShapes.style';

const SchemaPageShapes = () => {
  const { appState } = useGlobalState();
  const { schemaShapesList, handleDeleteSchema, handleInitSchemaCreatorUpdate } =
    useSchemaCreatorContext();
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('default');

  const onDelete = () => {
    setIsVisible(false);
    handleDeleteSchema(value);
  };

  const onUpdate = () => {
    handleInitSchemaCreatorUpdate(value);
  };

  return (
    <>
      <PopupConfirm
        title="Czy napewno chcesz usunac szablon?"
        subtitle="Tej czynności nie da się odwrócić!"
        handleConfirm={onDelete}
        handleCancel={() => setIsVisible(false)}
        isVisible={isVisible}
      />
      <div>
        <CardTitle fontSize="m">Szablony</CardTitle>
        <InputSelect
          value={value}
          handleChange={setValue}
          defaultOption={schemaShapesList.length ? 'Wybierz szablon' : 'Brak utworzonych szablonów'}
          options2={schemaShapesList}
          graphShapeId={appState.graphShape.id}
          width="100%"
          margin="2rem 0 0 0"
        />
        <WrapperButtons>
          <Button
            disabled={value === 'default'}
            margin="1rem 0.5rem 0 0"
            type="button"
            onClick={onUpdate}
          >
            Edytuj szablon
          </Button>
          <Button
            disabled={value === 'default'}
            isCancel
            margin="1rem 0 0 0.5rem"
            type="button"
            onClick={() => setIsVisible(true)}
          >
            Usun szablon
          </Button>
        </WrapperButtons>
      </div>
    </>
  );
};

export default SchemaPageShapes;
