import styled from 'styled-components';

export const GraphTable = styled.table`
  th,
  td {
    padding: 0.2rem 1rem;
  }

  td.empty {
    background-color: ${({ theme }) => theme.colors.error};
  }

  td.freeDay {
    background-color: ${({ theme }) => theme.colors.bg.darkGrey} !important;
  }

  td.aliasGraph {
    text-transform: capitalize;
    cursor: pointer;
  }

  td.highlight {
    background-color: ${({ theme }) => theme.colors.decors.highlight};
  }
`;
