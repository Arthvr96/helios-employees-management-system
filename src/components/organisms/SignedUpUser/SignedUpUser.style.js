import styled from 'styled-components';

export const UserNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 23rem;
  max-width: 33rem;
  height: 6rem;
  padding-left: 1rem;
  border-left: 1px solid ${({ theme }) => theme.colors.decors.white};
`;

export const User = styled.button`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h3`
  max-width: 26rem;
  overflow-wrap: anywhere;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
`;
export const UserRoleName = styled.h3`
  text-transform: capitalize;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.white};
`;

export const UserMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  z-index: 1000;
  top: 5.9rem;
  width: 17rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.bg.primary};
  background: ${({ theme }) => theme.colors.bg.primary};

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2rem 0;
  }
`;

export const LinkButton = styled.button`
  width: fit-content;
  height: fit-content;
  border: 0;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.white};
  padding: 1rem 0.5rem;
  transition: color 0.3s ease-in;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.routeSelected};
  }
`;
