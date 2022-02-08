import React from 'react';
import PropTypes from 'prop-types';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import PopupWrapper from 'components/atoms/PopupWrapper/PopupWrapper';
import {
  StyledTitle,
  WrapperButtons,
  StyledSubmitButton,
  StyledCardTemplate,
} from './PopupInfo.style';

const PopupInfo = ({ title, subtitle, handleConfirm, isVisible }) => {
  return (
    <PopupWrapper isVisible={isVisible}>
      <StyledCardTemplate>
        <StyledTitle fontSize="m">{title}</StyledTitle>
        {subtitle ? <CardSubtitle>{subtitle}</CardSubtitle> : null}
        <WrapperButtons>
          <StyledSubmitButton isAccept onClick={handleConfirm}>
            Potwierdz
          </StyledSubmitButton>
        </WrapperButtons>
      </StyledCardTemplate>
    </PopupWrapper>
  );
};

export default PopupInfo;

PopupInfo.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
