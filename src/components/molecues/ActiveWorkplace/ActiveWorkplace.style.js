import styled from 'styled-components';

export const ActiveWorkplaceWrapper = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  margin-top: 1rem;

  h4 {
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-right: 1rem;
  }
`;
