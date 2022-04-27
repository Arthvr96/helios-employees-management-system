import React, { useState } from 'react';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import InputSelect from 'components/atoms/InputSelect/InputSelect';
import { Button } from 'components/atoms/Button/Button';
import { WrapperButtons } from './SchemaPageShapes.style';

const shapes = ['Shape1', 'Shape2'];

const SchemaPageShapes = () => {
  const [value, setValue] = useState('default');
  return (
    <div>
      <CardTitle fontSize="m">Szablony</CardTitle>
      <InputSelect
        value={value}
        handleChange={setValue}
        defaultOption={shapes.length ? 'Wybierz szablon' : 'Brak utworzonych szablonów'}
        options={shapes}
        width="100%"
        margin="2rem 0 0 0"
      />
      <WrapperButtons>
        <Button disabled={value === 'default'} margin="1rem 0.5rem 0 0" type="button">
          Edytuj szablon
        </Button>
        <Button disabled={value === 'default'} isCancel margin="1rem 0 0 0.5rem" type="button">
          Usun wzor
        </Button>
      </WrapperButtons>
    </div>
  );
};

export default SchemaPageShapes;
