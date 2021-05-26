import React from 'react';
import { Switch, Route } from 'react-router-dom';


import LandingPage from './LandingPage.jsx';
import Calendar from './Calendar.jsx';
import CreateEvent from './CreateEvent';
import Explore from './Explore';


const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents(props) {

  return (
    <Switch>
      <Route path="/" exact render={() => (<LandingPage onUserChange={props.onUserChange} />)} /> 
      <Route path="/welcome" exact render={() => (<LandingPage onUserChange={props.onUserChange} />)} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/createevent" component={CreateEvent} />
      <Route path="/explore" component={Explore} />
      <Route component={NotFound} />
    </Switch>
  );
}