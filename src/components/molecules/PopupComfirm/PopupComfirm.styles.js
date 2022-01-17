import styled from 'styled-components';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ isVisible }) => (isVisible ? '500' : '-500')};
  display: flex;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0);
  background: radial-gradient(circle, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
  transition: opacity 0.3s ease-in-out;
`;

export const StyledTitle = styled(InterfaceWindowTitle)`
  width: 25.6rem;
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const StyledSubmitButton = styled(SubmitButton)`
  width: 45%;
  padding: 0.5rem 0rem;
  background-color: ${({ isAccept, theme }) =>
    isAccept ? theme.colors.success : theme.colors.error};
  color: ${({ theme }) => theme.colors.text.white};
  border: 1px solid
    ${({ isAccept, theme }) => (isAccept ? theme.colors.success : theme.colors.error)};

  &:hover {
    border: 1px solid
      ${({ isAccept, theme }) =>
        isAccept ? theme.colors.decors.hoverSuccess : theme.colors.decors.hoverError};
    background-color: ${({ isAccept, theme }) =>
      isAccept ? theme.colors.decors.hoverSuccess : theme.colors.decors.hoverError};
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.colors.decors.black};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text.black};
  }
`;
