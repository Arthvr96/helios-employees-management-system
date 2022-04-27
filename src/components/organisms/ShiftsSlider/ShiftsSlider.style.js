import styled, { css } from 'styled-components';

export const Slider = styled.div`
  position: relative;
  width: 80rem;
  height: 9rem;
  margin-top: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  border-radius: 10px;
  overflow-x: hidden;
`;

const mixinSliderButton = css`
  position: absolute;
  z-index: 200;
  top: -1px;
  width: 25px;
  height: 9rem;
  background-color: ${({ theme }) => theme.colors.bg.darkGrey};
  border: 0;
  cursor: pointer;

  &:hover {
    transition: background-color 0.2s ease-in;
    background-color: ${({ theme }) => theme.colors.bg.primary};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }
`;

export const SliderButtonLeft = styled.button`
  ${mixinSliderButton};
  left: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  svg {
    transform: rotate(90deg);
  }
`;
export const SliderButtonRight = styled.button`
  ${mixinSliderButton};
  right: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  svg {
    transform: rotate(-90deg);
  }
`;

export const ShiftsSliderContent = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  padding: 0 3rem;
  border-radius: 10px;
  transform: ${({ moveBy }) => `translateX(${moveBy}px)`};
  transition: transform 0.4s ease-in-out;
`;
