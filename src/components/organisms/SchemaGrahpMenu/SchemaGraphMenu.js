import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreateMode from 'components/molecules/CreateMode/CreateMode';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import {
  StyledWindow,
  StyledSubTitle,
  ActiveSchema,
  SelectedSchema,
  WrapperButtons,
} from './SchemaGraphMenu.style';

const SchemaGraphMenu = ({ handleCreateSchema }) => {
  // const []
  const [createMode, setCreateMode] = useState(false);

  return (
    <>
      {!createMode ? (
        <StyledWindow>
          <InterfaceWindowTitle>Wybór szablonu</InterfaceWindowTitle>
          <StyledSubTitle>
            Wybrany tydzień : <span>12-18 Nov</span>
          </StyledSubTitle>
          <ActiveSchema>
            <StyledSubTitle className="secondSub">Aktywny szablon : </StyledSubTitle>
            <SelectedSchema>empty</SelectedSchema>
          </ActiveSchema>
          <WrapperButtons>
            <SubmitButton onClick={() => setCreateMode(true)}>Stwórz nowy szablon</SubmitButton>
          </WrapperButtons>
        </StyledWindow>
      ) : null}

      {createMode ? (
        <CreateMode setCreateMode={setCreateMode} handleCreateSchema={handleCreateSchema} />
      ) : null}
    </>
  );
};

export default SchemaGraphMenu;

SchemaGraphMenu.propTypes = {
  handleCreateSchema: PropTypes.func,
};
