import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'
import 'babel-polyfill'
  
import LandingPage from './placeHolderLandingPage.jsx';

const element = <LandingPage />


ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}