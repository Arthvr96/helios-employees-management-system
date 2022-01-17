import styled from 'styled-components';

export const UserNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 23rem;
  height: 6rem;
  border-left: 1px solid ${({ theme }) => theme.colors.decors.white};
`;

export const User = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h3`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
`;
export const UserRoleName = styled.h3`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.white};
`;

export const UserAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0 1rem 0 0.5rem;
  border-radius: 100%;
  background: plum;
`;
