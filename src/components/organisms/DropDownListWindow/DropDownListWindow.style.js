import styled from 'styled-components';
import { InterfaceWindowTemplate } from 'components/templates/InterfaceWindowTemplate/InterfaceWindowTemplate';
import { InterfaceWindowTitle } from 'components/atoms/InterfaceWindowTitle/InterfaceWindowTitle';

export const DropDownList = styled.div`
  width: 40rem;
  height: fit-content;
  margin-bottom: 3rem;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 15px;
  box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.25);
`;

// HeaderDropDownList components

export const WrappingButton = styled.div`
  width: 100%;
  height: fit-content;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;
export const StyledInterfaceWindowTemplate = styled(InterfaceWindowTemplate)`
  justify-content: center;
  flex-direction: row;
  width: 100%;
  position: relative;
  z-index: 5;
  padding: 1.5rem 2.5rem;
  box-shadow: unset;
  border-bottom: 1px solid ${({ theme, isOpen }) => (isOpen ? theme.colors.decors.darkGrey : 0)};
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '15px')};
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '0px' : '15px')};
`;
export const StyledInterfaceWindowTitle = styled(InterfaceWindowTitle)`
  margin-right: 1rem;
`;

// Employee components

export const EmployeeWrapper = styled.div`
  display: flex;
  width: fit-content;
  padding: 0.5rem 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 7px;
  cursor: pointer;
  transform: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }
`;
export const EmployeeAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.bg.primary};

  span {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeight.light};
    color: ${({ theme }) => theme.colors.text.white};
    text-align: center;
    letter-spacing: 0px;
  }
`;
export const EmployeeInfo = styled.div`
  margin-left: 0.8rem;
`;
export const EmployeeName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};
`;
export const EmployeeMail = styled.p`
  max-width: 25rem;
  word-wrap: break-word;
  margin-top: 0.2rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
`;

// ContentDropDownList components

export const ContentDropDownListWrapper = styled(InterfaceWindowTemplate)`
  position: relative;
  z-index: 3;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: flex-start;
  width: 100%;
  max-height: 30rem;
  overflow-y: ${({ isScrollable }) => (isScrollable ? 'scroll' : 'hidden')};
  transform: translateY(-1.2rem);
  padding: 2.5rem 2.5rem 0rem 2.5rem;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  box-shadow: unset;
`;
