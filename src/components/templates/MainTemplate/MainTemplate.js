import React from 'react';
import PropTypes from 'prop-types';
import Navigation from 'components/organisms/Navigation/Navigation';
import { Wrapper } from './MainTemplate.style';

const MainTemplate = ({ children }) => {
  return (
    <Wrapper>
      <Navigation />
      {children}
    </Wrapper>
  );
};

export default MainTemplate;

MainTemplate.propTypes = {
  children: PropTypes.node,
};
