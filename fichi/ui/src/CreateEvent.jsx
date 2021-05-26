import React from 'react';

import CreateEventContainer from './containers/createEvent/create.event.container';
import './global.css';
import { withRouter } from 'react-router-dom';




class CreateEvent extends React.Component {
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
        <CreateEventContainer />
      </>
    )
  }
};

export default withRouter(CreateEvent);