import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  label {
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.black};

    div input.first {
      margin-right: 1rem;
    }
  }
`;
