import React from 'react';
import PropTypes from 'prop-types';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';

import { useWindowSize } from 'hooks/useWindowSize';
import {
  Wrapper,
  StyledTitle,
  WrapperButtons,
  StyledSubmitButton,
  StyledCardTemplate,
} from './PopupInfo.style';

const PopupInfo = ({ title, subtitle, handleConfirm, isVisible }) => {
  const { width, height } = useWindowSize();
  return (
    <Wrapper isVisible={isVisible} widthSize={width} heightSize={height}>
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

export default PopupInfo;

PopupInfo.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
