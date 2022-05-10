import styled from 'styled-components';

export const DeleteButton = styled.button`
  position: absolute;
  top: -5px;
  right: 5px;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.black};
  transition: color 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.white};
  }
`;

export const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;

  &:hover ${DeleteButton} {
    display: flex;
  }

  &:hover button {
    background-color: ${({ theme }) => theme.colors.error};
  }
`;

export const ShiftWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 7rem;
  margin-right: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  border-radius: 10px;
  background-color: ${({ theme, isMarathon, isNight }) => {
    const defaultBg = theme.colors.bg.grey;
    const night = '#4b7fe8';
    const marathon = '#8f5aee';

    if (isMarathon) {
      return marathon;
    }
    if (isNight) {
      return night;
    }

    return defaultBg;
  }};
  cursor: pointer;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.warn} !important;
  }
  &:hover p {
    color: ${({ theme }) => theme.colors.text.white} !important;
  }
`;

export const ShiftTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
`;

export const ShiftInfo = styled.p`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};
`;
