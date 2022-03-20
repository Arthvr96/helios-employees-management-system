import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CardTemplate = styled.div`
  display: flex;
  position: ${({ position }) => position || 'static'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({ justifyContent }) => justifyContent || 'unset'};
  width: ${({ width }) => width || 'fit-content'};
  min-width: ${({ minWidth }) => minWidth};
  height: fit-content;
  padding: ${({ padding }) => padding || '2.5rem 2rem'};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 15px;
  box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.25);
`;

CardTemplate.propTypes = {
  flexDirection: PropTypes.oneOf(['column', 'row']),
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
};
