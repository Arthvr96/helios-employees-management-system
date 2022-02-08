import styled from 'styled-components';
import PropTypes from 'prop-types';

export const UserAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size === 'xl' ? '4rem' : '3rem')};
  height: ${({ size }) => (size === 'xl' ? '4rem' : '3rem')};
  margin: 0 1rem 0 0.5rem;
  border-radius: 100%;
  background: ${({ bgColor }) => bgColor || 'plum'};
  font-size: ${({ size }) => (size === 'xl' ? '1.2rem' : '0.9rem')};
  font-weight: ${({ theme, size }) =>
    size === 'xl' ? theme.fontWeight.regular : theme.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.white};
  text-transform: capitalize;
`;

UserAvatar.propTypes = {
  size: PropTypes.oneOf(['xl', 'l']),
};
