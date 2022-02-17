import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CardTitle = styled.h3`
  margin: ${({ margin }) => margin};
  font-size: ${({ theme, fontSize = 'l' }) => theme.fontSize[fontSize]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.black};
  text-align: center;
`;

CardTitle.propTypes = {
  fontSize: PropTypes.oneOf(['xl', 'l', 'm']),
  margin: PropTypes.string,
};
