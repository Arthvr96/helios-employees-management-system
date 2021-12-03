import styled from 'styled-components';
import { Button } from 'components/atoms/Button/Button';

export const CreateModeWrapper = styled.div`
  position: relative;
  height: 17rem;
`;
export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 30px;
  left: ${({ isFirst }) => (isFirst ? '50%' : 'unset')};
  right: ${({ isFirst }) => (isFirst ? 'unset' : '50%')};
  transform: ${({ isFirst }) => (isFirst ? 'translateX(-105%)' : 'translateX(105%)')};
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  select {
    margin-top: 1rem;
    text-align: center;
  }
`;
