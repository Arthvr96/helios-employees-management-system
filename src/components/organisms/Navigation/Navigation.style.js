import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6rem;
  padding: 0 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.decors.white};
`;
