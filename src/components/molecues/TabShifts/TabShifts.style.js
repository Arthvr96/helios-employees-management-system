import styled from 'styled-components';

export const Table = styled.table`
  border: none;
`;

export const Shifts = styled.tr`
  width: 20rem;
  background-color: red;
  td {
    width: 5rem;
    height: 2.5rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.ligt};
    color: ${({ theme }) => theme.colors.textSecondary};
    background-color: ${({ theme }) => theme.colors.white};
    transition: background-color 0.2s ease-in;
    cursor: pointer;
  }

  td:last-child {
    width: 10rem;
  }

  td:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;
