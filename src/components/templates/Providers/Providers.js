import React from 'react';
import PropTypes from 'prop-types';
import SEO from 'components/templates/SEO/SEO';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'themes/theme';
import { GlobalStyle } from 'themes/GlobalStyles';
import GlobalStateProvider from 'providers/GlobalStateProvider/GlobalStateProvider';

const Providers = ({ children }) => {
  return (
    <SEO>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GlobalStateProvider>{children}</GlobalStateProvider>
        </ThemeProvider>
      </Router>
    </SEO>
  );
};

export default Providers;

Providers.propTypes = {
  children: PropTypes.node,
};
