import styled from 'styled-components';

export const NewShiftWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.darkGrey};
  border-radius: 10px;

  input {
    width: 100%;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  margin: ${({ margin }) => margin};

  input {
    width: 50px;
  }
`;
