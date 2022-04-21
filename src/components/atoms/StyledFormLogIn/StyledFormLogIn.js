import styled from 'styled-components';
import { Form } from 'components/atoms/Form/Form';

export const StyledFormLogIn = styled(Form)`
  min-width: 30rem;
  padding: 0 2rem;
  label {
    font-size: ${({ theme }) => theme.fontSize.s};
    text-transform: uppercase;

    input {
      width: 100%;
    }
  }
`;
