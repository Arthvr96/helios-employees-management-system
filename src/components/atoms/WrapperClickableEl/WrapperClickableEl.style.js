import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.text.grey : theme.colors.text.black};
`;
