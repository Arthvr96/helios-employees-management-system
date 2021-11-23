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

export const ActiveWorkplaceWrapper = styled.div`
  display: flex;
  align-items: center;

  h4 {
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-right: 1rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`;
