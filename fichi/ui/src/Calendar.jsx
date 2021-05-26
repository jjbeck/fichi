import React from 'react';

import CalendarContainer from './containers/calendar/calendar.container.jsx'
import './global.css';
import { withRouter } from 'react-router-dom';




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