import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  margin: 1rem 0;

  label {
    position: relative;
    margin-right: 3rem;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    z-index: 300;
  }

  input,
  select {
    margin-left: 0.5rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.decors.grey};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.light};
    padding: 0.5rem;
  }
`;

export const FilterButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.decors.grey};
  border-bottom: ${({ theme, isOpen }) => (isOpen ? 0 : `1px solid ${theme.colors.decors.grey}`)};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  width: 17rem;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.grey};
  }
`;

export const FilterBox = styled.div`
  position: absolute;
  top: 2.6rem;
  z-index: 200;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  width: 17rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.decors.grey};
  border-top: 0;
  background-color: ${({ theme }) => theme.colors.bg.secondary};

  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.7rem;
  }

  input {
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
  }
`;
