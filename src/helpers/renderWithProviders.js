import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'themes/theme';
import { GlobalStyle } from 'themes/GlobalStyles';
import SEO from 'components/templates/SEO/SEO';

export const RenderWithProviders = ({ children }) => {
  return render(
    <SEO>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </Router>
    </SEO>,
  );
};
