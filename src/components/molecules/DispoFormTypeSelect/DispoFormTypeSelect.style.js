import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: ${({ isError, freeDaySelected, theme }) => {
    if (isError) {
      return theme.colors.bg.error;
    }
    if (!freeDaySelected) {
      return theme.colors.bg.success;
    }
    return theme.colors.bg.grey;
  }};

  h3 {
    text-transform: capitalize;
  }
`;
