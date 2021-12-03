import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Title } from 'components/atoms/Title/Title';
import { CreateModeWrapper, Label, StyledButton } from './CreateMode.style';

const CreateMode = ({ setCreateMode, handleCreateSchema }) => {
  const [value, setValue] = useState('Pusty szablon');

  const onClick = () => {
    handleCreateSchema(value);
    setCreateMode(false);
  };
  return (
    <CreateModeWrapper>
      <Title>Tworzenie nowego szablonu</Title>
      <Label htmlFor="selectSchema">
        Stwórz na podstawie:
        <select
          id="selectSchema"
          name="selectSchema"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <option value="Pusty szablon">Pusty szablon</option>
          <option value="Ostatni szablon">Ostatni szablon</option>
          <option value="Wzór szablonu nr 1">Wzór szablonu nr 1</option>
        </select>
      </Label>
      <StyledButton isFirst onClick={() => setCreateMode(false)}>
        Anuluj
      </StyledButton>
      <StyledButton onClick={onClick}>{`Dalej ->`}</StyledButton>
    </CreateModeWrapper>
  );
};

export default CreateMode;

CreateMode.propTypes = {
  setCreateMode: PropTypes.func,
  handleCreateSchema: PropTypes.func,
};
