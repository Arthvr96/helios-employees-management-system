import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  h4 {
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 1rem 0;
  }
`;
export const ListAddedShiftsWrapper = styled.ul`
  position: relative;
  list-style: none;
  width: 800px;
  min-width: 800px;
  max-width: 800px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  overflow: hidden;
`;

export const ScrollButtons = styled.button`
  position: absolute;
  top: 0;
  right: ${({ isReverse }) => (isReverse ? 'unset' : '0')};
  left: ${({ isReverse }) => (isReverse ? '-1px' : 'unset')};
  content: '';
  z-index: 500;
  display: ${({ isDisabled }) => (isDisabled ? 'none' : 'block')};
  width: 2rem;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  border-top-right-radius: ${({ isReverse }) => (isReverse ? 'unset' : '15px')};
  border-bottom-right-radius: ${({ isReverse }) => (isReverse ? 'unset' : '15px')};
  border-top-left-radius: ${({ isReverse }) => (isReverse ? '15px' : 'unset')};
  border-bottom-left-radius: ${({ isReverse }) => (isReverse ? '15px' : 'unset')};
  border: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.white};
  transition: background-color 0.3s ease-in, color 0.3s ease-in;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const ScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 80px;
  padding: 0 2rem;
  transform: ${({ scrollValue }) => `translateX(${scrollValue}px)`};
  transition: transform 0.4s ease-in;
`;
