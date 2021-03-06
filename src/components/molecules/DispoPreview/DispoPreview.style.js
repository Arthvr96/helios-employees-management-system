import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export const StyledTitle = styled(CardTitle)`
  margin: 2rem 0 0 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.darkGrey};
`;

export const List = styled.ul`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1rem 0.5rem;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    color: ${({ theme }) => theme.colors.text.grey};
    border: 1px solid ${({ theme }) => theme.colors.decors.grey};
    padding: 0.5rem 0.3rem;
    border-radius: 5px;

    span {
      border-top: 1px solid ${({ theme }) => theme.colors.decors.grey};
      width: 50%;
      margin-top: 0.2rem;
      padding-top: 0.2rem;
      text-align: center;
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      color: ${({ theme }) => theme.colors.text.black};
    }
  }
`;

export const Message = styled.p`
  max-width: 335px;
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.grey};
  border: 1px solid ${({ theme }) => theme.colors.decors.grey};
  padding: 0.5rem 0.3rem;
  border-radius: 5px;
`;
