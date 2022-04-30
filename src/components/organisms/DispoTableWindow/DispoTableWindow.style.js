import styled from 'styled-components';

export const WindowTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  div {
    display: flex;
    justify-content: center;
  }

  button {
    height: fit-content;

    span.visible {
      color: ${({ theme }) => theme.colors.success};
    }
    span.nonVisible {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const Table = styled.table`
  margin-bottom: 2rem;
  td.alias {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    text-transform: capitalize;
  }
  td {
    min-width: 45px;
    padding: 0.4rem 0.2rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    color: ${({ theme }) => theme.colors.text.black};
  }

  tr th {
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: 0.3rem;
  }

  .tabTitle {
    font-size: ${({ theme }) => theme.fontSize.m};
  }

  .name {
    min-width: 10.5rem;
  }
  .day {
    min-width: 7rem;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    text-transform: uppercase;
  }
  .weekend {
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }

  .dayFree {
    background-color: ${({ theme }) => theme.colors.bg.darkGrey} !important;
  }

  tr.coffee td {
    background-color: ${({ theme }) => theme.colors.bg.coffeeGrey};
  }

  tr.notSent .alias {
    background-color: ${({ theme }) => theme.colors.error};
  }

  td.green {
    background-color: ${({ theme }) => theme.colors.success} !important;
  }
`;

export const MsgButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
