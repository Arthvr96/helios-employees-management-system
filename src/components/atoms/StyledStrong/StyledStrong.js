import styled from 'styled-components';

export const StyledStrong = styled.strong`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.black};
`;
