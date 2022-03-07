import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: inset 0px 0px 15px 1px rgba(0, 0, 0, 0.25);

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
