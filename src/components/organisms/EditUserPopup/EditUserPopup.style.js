import styled from 'styled-components';
import { CardSubtitle } from 'components/atoms/CardSubtitle/CardSubtitle';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import trashSvg from 'assets/trash.svg';

export const StyledCardTemplate = styled(CardTemplate)`
  position: relative;
  padding: 1rem 5rem;
`;

export const StyledTitle = styled(CardTitle)`
  padding: 1rem 0 2rem 0;
`;

export const Name = styled(CardSubtitle)`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.black};
  text-transform: capitalize;
  margin-bottom: 2rem;
`;

export const ListValues = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.grey};
  }

  li:last-child {
    align-self: center;
  }
`;

export const Span = styled.span`
  margin: 0.5rem 0 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
  text-transform: ${({ isCapitalize }) => (isCapitalize ? 'capitalize' : 'none')};
`;

export const WrapperButtons = styled.div`
  display: flex;
  margin: 2rem 0 1rem;

  button {
    margin-right: 1rem;
  }
`;

export const DeleteAccButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 1.5rem 0.7rem 3.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  background-color: ${({ theme }) => theme.colors.bg.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.white};
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 1rem;
    display: block;
    width: 2rem;
    height: 2rem;
    transform: translateY(-50%);
    background: url(${trashSvg}) no-repeat;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    border: 1px solid ${({ theme }) => theme.colors.error};
  }
`;
