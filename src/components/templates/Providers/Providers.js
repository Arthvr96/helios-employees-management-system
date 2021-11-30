import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStateProvider from 'providers/GlobalStateProvider/GlobalStateProvider';
import SEO from 'components/molecues/SEO/SEO';
import { ThemeProvider } from 'styled-components';
import { theme } from 'themes/theme';
import { GlobalStyle } from 'themes/GlobalStyles';
import AdminStateProvider from 'providers/AdminStateProvider/AdminStateProvider';
import { apolloClient } from 'api/apolloClient';

const Providers = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );
};

export default Providers;

Providers.propTypes = {
  children: PropTypes.node,
};
