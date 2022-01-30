import React from 'react';
import PropTypes from 'prop-types';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';

import {
  Wrapper,
  StyledTitle,
  WrapperButtons,
  StyledSubmitButton,
  StyledCardTemplate,
} from './PopupInfo.style';

const PopupConfirm = ({ title, subtitle, handleConfirm, isVisible }) => {
  return (
    <Wrapper isVisible={isVisible}>
      <StyledCardTemplate>
        <StyledTitle fontSize="m">{title}</StyledTitle>
        {subtitle ? <CardSubtitle>{subtitle}</CardSubtitle> : null}
        <WrapperButtons>
          <StyledSubmitButton isAccept onClick={handleConfirm}>
            Potwierdz
          </StyledSubmitButton>
        </WrapperButtons>
      </StyledCardTemplate>
    </Wrapper>
  );
};

export default PopupConfirm;

PopupConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
