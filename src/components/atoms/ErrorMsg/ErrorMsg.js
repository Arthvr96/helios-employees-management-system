import styled from 'styled-components';

export const ErrorMsg = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 0.5rem;
  text-align: center;
  text-transform: lowercase;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;
