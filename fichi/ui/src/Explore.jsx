import React from 'react';


import SideBar from './components/sidebar/sidebar';
import './global.css';
import { withRouter } from 'react-router-dom';




class Explore extends React.Component {
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
        <SideBar/>
      </>
    )
  }
};

export default withRouter(Explore);