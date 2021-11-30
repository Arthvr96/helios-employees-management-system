import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

export const AddNewShiftButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGrey};
  }
`;
