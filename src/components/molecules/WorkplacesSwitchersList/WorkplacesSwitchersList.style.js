import styled from 'styled-components';

export const Wrapper = styled.ul`
  width: fit-content;
  list-style: none;
  padding-top: 1rem;
  columns: 2;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    color: ${({ theme }) => theme.colors.text.black};
    span {
      margin-right: 1rem;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
`;
