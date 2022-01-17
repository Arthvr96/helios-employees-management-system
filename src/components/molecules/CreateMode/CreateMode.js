import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { StyledWindow, Label, ButtonsWrapper } from './CreateMode.style';

const CreateMode = ({ setCreateMode, handleCreateSchema }) => {
  const [value, setValue] = useState('Pusty szablon');

  const handleComfirm = () => {
    handleCreateSchema(value);
    setCreateMode(false);
  };

  const handleCancel = () => {
    setCreateMode(false);
  };

  return (
    <StyledWindow>
      <InterfaceWindowTitle>Tworzenie nowego szablonu</InterfaceWindowTitle>
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
      <ButtonsWrapper>
        <SubmitButton onClick={handleCancel}>Anuluj</SubmitButton>
        <SubmitButton onClick={handleComfirm}>{`Dalej ->`}</SubmitButton>
      </ButtonsWrapper>
    </StyledWindow>
  );
};

export default CreateMode;

CreateMode.propTypes = {
  setCreateMode: PropTypes.func,
  handleCreateSchema: PropTypes.func,
};
