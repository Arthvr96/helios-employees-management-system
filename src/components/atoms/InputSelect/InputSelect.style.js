import styled from 'styled-components';

export const Select = styled.select`
  margin: ${({ margin }) => margin};
  padding: 0.3rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.grey};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
  border-radius: 5px;
`;
