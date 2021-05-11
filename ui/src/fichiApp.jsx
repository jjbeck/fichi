import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'
import 'babel-polyfill'
import { BrowserRouter as Router } from 'react-router-dom';


  
import Page from './Page.jsx'




ReactDOM.render(
  
    <Router>
    <Page />
  </Router>,
  document.getElementById('contents'),

);


if (module.hot) {
  module.hot.accept();
}