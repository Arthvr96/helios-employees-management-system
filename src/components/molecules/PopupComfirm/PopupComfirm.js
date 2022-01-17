import React from 'react';
import PropTypes from 'prop-types';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowSubTitle } from 'components/atoms/InterfaceWindowSubTitle/InterfaceWindowSubTitle';
import { Wrapper, StyledTitle, WrapperButtons, StyledSubmitButton } from './PopupComfirm.styles';

const PopupComfirm = ({ title, subtitle, handleComfirm, handleCancel, isVisible }) => {
  return (
    <Wrapper isVisible={isVisible}>
      <InterfaceWindowTemplate>
        <StyledTitle fontSize="m">{title}</StyledTitle>
        {subtitle ? <InterfaceWindowSubTitle>{subtitle}</InterfaceWindowSubTitle> : null}
        <WrapperButtons>
          <StyledSubmitButton isAccept onClick={handleComfirm}>
            Potwierdz
          </StyledSubmitButton>
          <StyledSubmitButton onClick={handleCancel}>Anuluj</StyledSubmitButton>
        </WrapperButtons>
      </InterfaceWindowTemplate>
    </Wrapper>
  );
};

export default PopupComfirm;

PopupComfirm.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isVisible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleComfirm: PropTypes.func,
};
