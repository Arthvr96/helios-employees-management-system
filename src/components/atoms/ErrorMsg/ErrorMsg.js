import styled from 'styled-components';

export const ErrorMsg = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.5rem;
  text-align: center;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;
