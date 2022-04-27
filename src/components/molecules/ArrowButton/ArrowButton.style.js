import styled from 'styled-components';

export const StyledButton = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  width: fit-content;
  height: fit-content;
  border: 0;
  background-color: transparent;
  padding: 2rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.grey};
  cursor: pointer;
  transition: color 0.2s ease-in;

  svg {
    transform: rotate(-90deg);
    path {
      transition: stroke 0.2s ease-in;
      stroke: ${({ theme }) => theme.colors.decors.grey};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text.black};

    svg {
      path {
        stroke: ${({ theme }) => theme.colors.decors.black};
      }
    }
  }
`;
