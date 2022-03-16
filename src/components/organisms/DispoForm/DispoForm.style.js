import styled from 'styled-components';
import arrow from 'assets/arrowWhite.svg';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin};

  button.first {
    margin-right: 1rem;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 800px;
`;

export const MessageButton = styled.button`
  position: relative;
  padding: 1rem 3.5rem 1rem 1.5rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: 5px;
  cursor: pointer;
  border: ${({ theme, error }) =>
    error ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.bg.primary}`};
  span {
    color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.text.white)};
  }

  &:after {
    position: absolute;
    right: 5px;
    top: ${({ isOpen }) => (isOpen ? '50%' : '0%')};
    content: '';
    display: block;
    width: 15px;
    height: 15px;
    transform: ${({ isOpen }) =>
      isOpen ? 'rotate(0deg) translateY(-50%)' : 'rotate(180deg) translateY(-50%)'};
    background: url(${arrow}) no-repeat;
    background-size: 100% 100%;
  }
`;
