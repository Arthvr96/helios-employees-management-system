import styled from 'styled-components';

export const StyledList = styled.ol`
  column-count: 2;
  li {
    margin-bottom: 1.5rem;

    span {
      padding: 0.5rem;
      background-color: ${({ theme }) => theme.colors.bg.primary};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      color: ${({ theme }) => theme.colors.text.white};
      border-radius: 5px;
    }
  }
`;

export const Separator = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.darkGrey};
  text-indent: -2rem;
  margin-bottom: 1rem;
`;
