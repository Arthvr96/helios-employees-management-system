import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const WrapperWindows = styled.div`
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
`;

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

  .day {
    text-transform: uppercase;
  }

  tr.notSent {
    td {
      background-color: ${({ theme }) => theme.colors.error};
    }
  }

  td.green {
    background-color: ${({ theme }) => theme.colors.success};
  }
`;

export const MsgButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const StyledCardTitle = styled(CardTitle)`
  span {
    text-transform: capitalize;
  }
`;
