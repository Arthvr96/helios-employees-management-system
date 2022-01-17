import styled from 'styled-components';

export const InterfaceWindowTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 2.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 15px;
  box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.25);
`;
