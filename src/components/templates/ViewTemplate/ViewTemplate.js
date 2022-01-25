import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'hooks/useWindowSize';
import { Wrapper } from './ViewTemplate.style';

const ViewTemplate = ({
  children,
  flexDirection,
  justifyContent,
  alignItems,
  navMarginDisabled,
}) => {
  const { height } = useWindowSize();
  return (
    <Wrapper
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      heightSize={height}
      navMarginDisabled={navMarginDisabled}
    >
      {children}
    </Wrapper>
  );
};

export default ViewTemplate;

ViewTemplate.propTypes = {
  children: PropTypes.node,
  flexDirection: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  navMarginDisabled: PropTypes.bool,
};
