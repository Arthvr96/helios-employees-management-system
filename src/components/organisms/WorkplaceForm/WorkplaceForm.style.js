import styled from 'styled-components';

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: capitalize;

  span {
    text-transform: uppercase;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2rem 3rem 0 4.5rem;
`;
