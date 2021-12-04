import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.5rem;
`;

export const ErrorMessages = styled.div`
  height: 1.6rem;
  margin-top: 1rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.error};
`;
