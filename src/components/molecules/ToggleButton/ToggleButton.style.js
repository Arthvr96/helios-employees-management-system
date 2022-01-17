import styled from 'styled-components';

export const ButtonActive = styled.button`
  position: relative;
  width: 45px;
  height: 20px;
  border: 0;
  background-color: ${({ state }) => (state ? '#00A410' : '#c80303')};
  border-radius: 15px;
  cursor: pointer;
  box-shadow: inset 0px 0px 2px -0px rgba(0, 0, 0, 0.7);
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  &::before {
    content: '';
    z-index: 3;
    position: absolute;
    left: 1px;
    top: 50%;
    transform: translateY(-50%);
    transform: ${({ state }) => (state ? 'translate(25px, -50%)' : 'translate(0px, -50%)')};
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 4px -0px rgba(0, 0, 0, 0.6);
    transition: transform 0.3s ease-in-out;
  }

  span {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50% + 6px), -50%);
    transform: ${({ state }) =>
      state ? 'translate(calc(-50% - 8px), -50%)' : 'translate(calc(-50% + 6px), -50%)'};
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.4);
  }
`;
