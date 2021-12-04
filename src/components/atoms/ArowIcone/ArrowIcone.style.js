import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transform: ${({ isRotate }) => (isRotate ? `rotate(0deg)` : `rotate(180deg)`)};

    path {
      stroke: ${({ theme, isReversed }) =>
        isReversed ? theme.colors.decors.white : theme.colors.decors.black};
    }
  }
`;
