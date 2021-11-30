import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Title } from 'components/atoms/Title/Title';
import { Button } from 'components/atoms/Button/Button';

const CreateModeWrapper = styled.div`
  position: relative;
  height: 100%;
`;
const StyledButton = styled(Button)`
  position: absolute;
  bottom: 30px;
  left: ${({ isFirst }) => (isFirst ? '50%' : 'unset')};
  right: ${({ isFirst }) => (isFirst ? 'unset' : '50%')};
  transform: ${({ isFirst }) => (isFirst ? 'translateX(-105%)' : 'translateX(105%)')};
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  select {
    margin-top: 1rem;
    text-align: center;
  }
`;

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
          onChange={() => {
            setValue(value);
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
