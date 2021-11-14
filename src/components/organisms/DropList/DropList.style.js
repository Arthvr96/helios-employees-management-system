import styled from 'styled-components';
import arrow from 'assets/arrow.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: ${({ isOpen, numberOfEmployees }) =>
    isOpen && numberOfEmployees > 6 ? 'scroll' : 'hidden'};
  width: fit-content;
  height: ${({ heightBox }) => heightBox}px;
  border-radius: 15px;
  border-bottom-right-radius: ${({ isOpen, numberOfEmployees }) =>
    isOpen && numberOfEmployees > 6 ? '0px' : '15px'};
  border-top-right-radius: ${({ isOpen, numberOfEmployees }) =>
    isOpen && numberOfEmployees > 6 ? '0px' : '15px'};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 0.3s ease-in;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 15px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1.8rem 2.5rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleDropList = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const Arrow = styled.div`
  width: 1.3rem;
  height: 0.8rem;
  background: url(${arrow}) no-repeat;
  margin-left: 3.5rem;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1,1)' : 'scale(1,-1)')};
  transition: transform 0.3s ease-in;
`;
