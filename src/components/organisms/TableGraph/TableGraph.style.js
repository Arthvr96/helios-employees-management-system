import styled from 'styled-components';

export const Table = styled.table`
  margin-top: 3rem;
  margin-left: 3rem;
  border: 1px solid black;

  thead tr.daysName th {
    width: 20rem;
    padding: 0.5rem 0rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.white};
  }
  thead tr.daysNumber th {
    width: 14rem;
    padding: 0.2rem 0rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textSecondary};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
