import styled from 'styled-components';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';

export const WrapperLabel = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};

  div {
    margin-left: 2rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

export const WrapperInputs = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: 100%;
  }
`;

export const StyledSubmitButton = styled(SubmitButton)`
  width: 100%;
`;
