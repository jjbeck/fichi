import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'
import 'babel-polyfill'
import { BrowserRouter as Router } from 'react-router-dom';

  
import LandingPage from './placeHolderLandingPage.jsx';

const element = (
  <Router>
    <LandingPage />
  </Router>
);


ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}