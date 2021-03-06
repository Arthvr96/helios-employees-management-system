import React from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from 'hooks/useWindowSize';
import { Wrapper } from './ViewTemplate.style';

const ViewTemplate = ({
  minWidth,
  children,
  flexDirection,
  justifyContent,
  alignItems,
  navMargin,
  padding,
  customWidth,
  overflow,
}) => {
  const { width, height } = useWindowSize();
  return (
    <Wrapper
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      widthSize={customWidth || width}
      heightSize={height}
      navMargin={navMargin}
      padding={padding}
      minWidth={minWidth}
      overflow={overflow}
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
  padding: PropTypes.string,
  minWidth: PropTypes.string,
  customWidth: PropTypes.string,
  overflow: PropTypes.string,
};
