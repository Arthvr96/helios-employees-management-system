import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  z-index: 20000;
  display: flex;
  justify-content: center;
  width: ${({ widthSize }) => widthSize}px;
  height: ${({ heightSize }) => heightSize}px;
  background: rgb(0, 0, 0);
  background: radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%);

  button {
    font-size: ${({ theme }) => theme.fontSize.m};
  }

  ul li p {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 1rem;
  max-width: 800px;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
  padding: 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.white};
  margin: ${({ margin }) => margin};
  padding: 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
`;

export const Navigation = styled.div`
  margin-top: 5rem;
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
`;
