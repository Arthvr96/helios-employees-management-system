import styled from 'styled-components';

export const ShiftType = styled.tr`
  td {
    width: 14rem;
    padding: 0.4rem 0rem;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textSecondary};
    background-color: ${({ theme }) => theme.colors.grey};
    text-transform: uppercase;
  }
`;
