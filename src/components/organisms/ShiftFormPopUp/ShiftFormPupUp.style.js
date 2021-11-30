import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Popup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 5rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  animation: slidein 0.3s ease-in-out forwards;

  @keyframes slidein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  label span {
    display: block;
    width: 120px;
    margin-right: 1.5rem;
  }

  input.number {
    width: 70px;
  }
`;

export const WrapperButtons = styled.div`
  display: flex;
  margin-top: 3rem;
`;
