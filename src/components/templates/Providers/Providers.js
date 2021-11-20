import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStateProvider from 'providers/GlobalStateProvider/GlobalStateProvider';
import SEO from 'components/molecues/SEO/SEO';
import { ThemeProvider } from 'styled-components';
import { theme } from 'themes/theme';
import { GlobalStyle } from 'themes/GlobalStyles';
import AdminStateProvider from 'providers/AdminStateProvider/AdminStateProvider';

const Providers = ({ children }) => {
  return (
    <SEO>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GlobalStateProvider>
            <AdminStateProvider>{children}</AdminStateProvider>
          </GlobalStateProvider>
        </ThemeProvider>
      </Router>
    </SEO>
  );
};

export default Providers;

Providers.propTypes = {
  children: PropTypes.node,
};
