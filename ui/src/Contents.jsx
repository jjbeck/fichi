import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from './LandingPage.jsx';
import Calendar from './Calendar.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents(props) {
  
  return (
    <Switch>
      <Redirect exact from="/" to="/welcome" />
      <Route path="/welcome" render={() => (<LandingPage onUserChange={props.onUserChange} />)} /> 
      <Route path="/calendar" component={Calendar} />
      <Route component={NotFound} />
    </Switch>
  );
}