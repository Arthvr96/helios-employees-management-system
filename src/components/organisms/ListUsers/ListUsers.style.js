import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const Wrapper = styled.div`
  width: 95rem;
`;

export const StyledTitle = styled(CardTitle)`
  margin-top: 2rem;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
  list-style: none;

  li {
    border: 1px solid ${({ theme }) => theme.colors.decors.grey};
    border-radius: 5px;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: background-color, 0.2s ease-in;

    &:hover {
      background-color: ${({ theme }) => theme.colors.bg.grey};
    }
    p {
      text-transform: capitalize;
    }

    button {
      padding: 0.5rem 0;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
`;
