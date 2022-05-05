import styled from 'styled-components';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';

export const StyledCard = styled(CardTemplate)`
  padding: 0 0 2rem 0;
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
`;

export const GraphPreview = styled.div`
  z-index: 5000;
  display: flex;
  align-items: center;
  position: absolute;
  top: calc(50% + 30px);
  left: ${({ isOpen }) => (isOpen ? '50%' : '50px')};
  transform: ${({ isOpen }) => (isOpen ? 'translate(-50%, -50%)' : 'translate(-100%, -50%)')};
  transition: transform 0.4s ease-in, left 0.4s ease-in;
`;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.decors.white};
  transform: translateX(-1px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 10px 10px 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};
  width: 50px;
  height: 50px;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.darkGrey};
    color: ${({ theme }) => theme.colors.text.white};
  }
`;
