import styled from 'styled-components';
import { CardTitle } from 'components/atoms/CardTitle/CardTitle';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.grey};
  border-radius: 10px;
  margin-top: 2rem;
`;

export const StyledTitle = styled(CardTitle)`
  font-size: ${({ theme }) => theme.fontSize.s};
`;

export const SubTitle = styled.p`
  margin: 0.5rem 0 2rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
  text-align: center;
`;
