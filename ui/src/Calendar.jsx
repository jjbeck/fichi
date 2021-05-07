import React from 'react';

import CalendarContainer from './containers/calendar/calendar.container.jsx'
import './global.css';
import { withRouter } from 'react-router-dom';

import initFacebookSdk from './components/auth/initFacebookSDK.js'
import initGoogleSdk from './components/auth/initGoogleSDK.js'

class Calendar extends React.Component {
  constructor() {
    super();
    
    this.state = {
      signedUp: false,
      email: '',
    };
  }

  render() {
    return (
      <>
        <CalendarContainer />
      </>
    )
  }
};

export default withRouter(Calendar);