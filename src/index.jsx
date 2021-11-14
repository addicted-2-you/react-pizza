import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import App from './App';

import apolloClientConfig from './gql-client/apollo-client.config';

ReactDOM.render(
  <ApolloProvider client={apolloClientConfig}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
