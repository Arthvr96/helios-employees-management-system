import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEO = ({ children }) => (
  <HelmetProvider>
    <Helmet>
      <meta name="robots" content="noindex" />
      <title>Helios - employees management app</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    {children}
  </HelmetProvider>
);

export default SEO;

SEO.propTypes = {
  children: PropTypes.node.isRequired,
};
