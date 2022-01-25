import React from 'react';
import PropTypes from 'prop-types';
import SEO from 'components/templates/SEO/SEO';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'themes/theme';
import { GlobalStyle } from 'themes/GlobalStyles';
import AuthProvider from 'providers/AuthProvider/AuthProvider';

const Providers = ({ children }) => {
  return (
    <SEO>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </Router>
    </SEO>
  );
};

export default Providers;

Providers.propTypes = {
  children: PropTypes.node,
};
