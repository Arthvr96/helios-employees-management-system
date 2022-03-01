import styled from 'styled-components';

export const PropertiesWrapper = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  padding: 1rem 1rem 1.5rem 1rem;

  div {
    width: 100%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-around;
  }

  span {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  span input {
    margin-left: 1rem;
    width: 1.6rem;
    height: 1.6rem;
  }
  span select {
    width: 75%;
    border: 1px solid ${({ theme }) => theme.colors.decors.black};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.bg.secondary};
    color: ${({ theme }) => theme.colors.text.black};
  }
`;
