import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { onError } from "@apollo/client/link/error";
import toastify from './components/toast/toast';
import ToastContainerCustom from './components/toast/toastcontainer';
import Cookies from 'universal-cookie';
import { setContext } from '@apollo/client/link/context';

import Page from './Page.jsx'

const cookies = new Cookies();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      toastify(message, 'error'),
      
    );

  if (networkError) toastify(networkError, 'error');
});

const authLink = setContext((_, { headers }) => {
  const token = cookies.get('token');
  return {
    headers: {
      ...headers,
      authorization: token? `Bearer ${token}`: "",
    }
  }
});

const link = new HttpLink({
  uri: 'http://localhost:8080/graphql',
})
const client = new ApolloClient({
  link: from([errorLink, authLink, link]),
  cache: new InMemoryCache()
});





ReactDOM.render(

    <Router>
    <ApolloProvider client={client}>
    <Page />
    <ToastContainerCustom />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
