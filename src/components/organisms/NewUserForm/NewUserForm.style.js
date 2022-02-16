import styled from 'styled-components';
import { SubmitButton } from 'components/atoms/SubmitButton/SubmitButton';
import { Form } from 'components/atoms/Form/Form';

export const StyledForm = styled(Form)`
  margin-top: 0;
`;

export const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperLabel = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};

  div {
    margin-left: 2rem;
  }
`;

export const StyledWrapperLabel = styled(WrapperLabel)`
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;

  div {
    font-size: ${({ theme }) => theme.fontSize.s};
    margin-left: 0;
  }
`;

export const WrapperAdmin = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};
  margin-bottom: 2rem;

  button {
    margin-left: 2rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
