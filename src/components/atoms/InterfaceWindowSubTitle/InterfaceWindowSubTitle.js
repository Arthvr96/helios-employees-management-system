import styled from 'styled-components';

export const InterfaceWindowSubTitle = styled.h4`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.grey};
  text-align: center;
`;
