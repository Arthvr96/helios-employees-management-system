import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from 'providers/AuthProvider/AuthProvider';
import Root from 'components/views/Root/Root';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
