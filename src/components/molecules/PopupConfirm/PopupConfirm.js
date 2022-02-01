import React from 'react';
import PropTypes from 'prop-types';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import {
  Wrapper,
  StyledTitle,
  WrapperButtons,
  StyledSubmitButton,
} from 'components/molecules/PopupConfirm/PopupConfirm.styles';

const PopupConfirm = ({ title, subtitle, handleConfirm, handleCancel, isVisible }) => {
  return (
    <Wrapper isVisible={isVisible}>
      <CardTemplate>
        <StyledTitle fontSize="m">{title}</StyledTitle>
        {subtitle ? <CardSubtitle>{subtitle}</CardSubtitle> : null}
        <WrapperButtons>
          <StyledSubmitButton isAccept onClick={handleConfirm}>
            Potwierdz
          </StyledSubmitButton>
          <StyledSubmitButton onClick={handleCancel}>Anuluj</StyledSubmitButton>
        </WrapperButtons>
      </CardTemplate>
    </Wrapper>
  );
};

export default PopupConfirm;

PopupConfirm.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
};
