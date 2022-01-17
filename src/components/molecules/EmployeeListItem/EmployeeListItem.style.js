import styled from 'styled-components';

export const Employee = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 2.5rem 0.5rem 2.5rem 3rem;
  transition: background-color 0.3s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGrey};
  }
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.primary};

  span {
    width: 50%;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

export const AvatarFullName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.1rem;
`;
export const AvatarMail = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  color: ${({ theme }) => theme.colors.grey};
  text-transform: lowercase;
`;
