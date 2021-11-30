import styled from 'styled-components';

export const Title = styled.h3`
  width: 30rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 0.5rem;
`;
