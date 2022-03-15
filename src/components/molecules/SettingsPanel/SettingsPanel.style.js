import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ isVisible }) => (isVisible ? '10000' : '-500')};
  display: flex;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  justify-content: center;
  align-items: center;
  width: ${({ widthSize }) => widthSize}px;
  height: ${({ heightSize }) => heightSize}px;
  background: rgb(0, 0, 0);
  background: radial-gradient(circle, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
  transition: opacity 0.3s ease-in-out;
`;

export const StyledInput = styled.input`
  width: 300px;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ theme, editMode }) => (editMode ? theme.colors.decors.grey : 'transparent')};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
`;

export const StyledButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;

  li {
    svg {
      transform: translateY(3px);
      margin-left: 1rem;
      padding: 0.3rem;
      border: 1px solid ${({ theme }) => theme.colors.decors.grey};
      border-radius: 3px;
      cursor: pointer;
      transition: border 0.2s ease-in, background-color 0.2s ease-in;

      path {
        fill: ${({ theme }) => theme.colors.bg.primary};
        transition: fill 0.2s ease-in;
      }
    }
  }

  li:nth-child(odd) {
    margin-bottom: 1rem;
    cursor: pointer;
  }

  li:nth-child(odd):hover svg {
    background-color: ${({ theme }) => theme.colors.bg.primary};
    border: 1px solid ${({ theme }) => theme.colors.bg.primary};

    path {
      fill: ${({ theme }) => theme.colors.bg.secondary};
    }
  }

  li:nth-child(even) {
    margin-bottom: 2.5rem;
  }
`;
