import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'hooks/useWindowSize';
import { Wrapper } from './ViewTemplate.style';

const ViewTemplate = ({ children, flexDirection, justifyContent, alignItems, navMargin }) => {
  const { width, height } = useWindowSize();
  return (
    <Wrapper
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      widthSize={width}
      heightSize={height}
      navMargin={navMargin}
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
  navMargin: PropTypes.string,
};
