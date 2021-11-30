import styled from 'styled-components';

export const ShiftWrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  height: 50px;
  min-width: 100px;
  width: 100px;
  margin-right: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

export const DeleteButton = styled.button`
  opacity: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -7px;
  right: -7px;
  z-index: 50;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 100%;
  background-color: #d17777;
  color: rgba(255, 255, 255, 1);
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  cursor: pointer;
  transition: opacity 0.2s ease-in, background-color 0.2s ease-in;

  &:hover {
    background-color: red;
  }

  ${ShiftWrapper}:hover & {
    opacity: 1;
  }
`;

export const ClickableWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 15px;
`;

export const NumberOfShift = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.3rem;
`;

export const TimeShift = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
