import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.decors.grey};
  border-radius: 5px;
  margin-bottom: 1rem;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1rem;

    li {
      display: flex;
      align-items: center;
      margin-left: 1rem;
      font-size: ${({ theme }) => theme.fontSize.m};

      input {
        margin-left: 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
        border: 1px solid ${({ theme }) => theme.colors.decors.black};
        background-color: ${({ theme }) => theme.colors.bg.secondary};
      }
    }

    li:first-child {
      margin-left: 0;
    }
  }
`;
