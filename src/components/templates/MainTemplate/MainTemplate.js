import React from 'react';
import PropTypes from 'prop-types';
import AdminStateProvider from 'providers/AdminStateProvider/AdminStateProvider';
import Navigation from 'components/organisms/Navigation/Navigation';
import { Wrapper } from './MainTemplate.style';

const MainTemplate = ({ children }) => {
  return (
    <AdminStateProvider>
      <Wrapper>
        <Navigation />
        {children}
      </Wrapper>
    </AdminStateProvider>
  );
};

export default MainTemplate;

MainTemplate.propTypes = {
  children: PropTypes.node,
};
