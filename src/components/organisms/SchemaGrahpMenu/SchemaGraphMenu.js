import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';
import { Title } from 'components/atoms/Title/Title';
import CreateMode from 'components/molecues/CreateMode/CreateMode';

const SchemaGraphMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-radius: 15px;
  margin: auto 0;
`;

const ActiveSchema = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 1rem;
  margin-top: 2rem;
`;

const SubTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SelectedSchema = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const WrapperButtons = styled.div`
  margin: 1.5rem;
`;

const StyledButton = styled(Button)`
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const SchemaGraphMenu = ({ handleCreateSchema }) => {
  const [createMode, setCreateMode] = useState(false);

  return (
    <SchemaGraphMenuWrapper>
      {!createMode ? (
        <>
          <Title>Wybór szablonu</Title>
          <SubTitle>Wybrany tydzień : 12-18 Nov</SubTitle>
          <ActiveSchema>
            <SubTitle>Aktywny szablon : </SubTitle>
            <SelectedSchema>empty</SelectedSchema>
          </ActiveSchema>
          <WrapperButtons>
            <StyledButton onClick={() => setCreateMode(true)}>Stwórz nowy szablon</StyledButton>
          </WrapperButtons>
        </>
      ) : null}
      {createMode ? (
        <CreateMode setCreateMode={setCreateMode} handleCreateSchema={handleCreateSchema} />
      ) : null}
    </SchemaGraphMenuWrapper>
  );
};

export default SchemaGraphMenu;

SchemaGraphMenu.propTypes = {
  handleCreateSchema: PropTypes.func,
};
