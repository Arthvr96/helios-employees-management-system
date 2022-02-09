import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.bg.grey};

  h3 {
    text-transform: capitalize;
  }
`;
