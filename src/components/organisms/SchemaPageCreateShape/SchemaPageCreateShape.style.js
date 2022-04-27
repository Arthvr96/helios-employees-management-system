import styled from 'styled-components';
import { Field } from 'formik';

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const StyledField = styled(Field)`
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: 0.3rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.grey};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.black};
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.grey};
  margin-bottom: 0.5rem;
`;
