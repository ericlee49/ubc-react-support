// var React = require('react');
// var ReactDOM = require('react-dom');
// require('./index.css');
// var App = require('./components/App');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {BrowserRouter} from 'react-router-dom';

const httpLink = createHttpLink({
  // uri: 'http://localhost:1337/graphql'
  uri: 'http://142.103.60.10:1337/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>  
  </BrowserRouter>,
  document.getElementById('app')
)