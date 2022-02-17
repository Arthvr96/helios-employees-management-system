import styled from 'styled-components';

export const WrapperWindows = styled.div`
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const Table = styled.table`
  margin-bottom: 2rem;
  td.alias {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    text-transform: capitalize;
  }
  td {
    min-width: 45px;
    padding: 0.2rem 0.3rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    color: ${({ theme }) => theme.colors.text.black};
  }

  tr.notSent {
    td {
      background-color: ${({ theme }) => theme.colors.error};
    }
  }
`;
