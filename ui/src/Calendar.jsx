import React from 'react';

import CalendarContaine from './containers/calendar/calendar.container.jsx'
import './global.css';
import { withRouter } from 'react-router-dom';

import initFacebookSdk from './components/auth/initFacebookSDK.js'
import initGoogleSdk from './components/auth/initGoogleSDK.js'

class Calendar extends React.Component {
  constructor() {
    super();
    this.signedUpChange = this.signedUpChange.bind(this);
    this.state = {
      signedUp: false,
      email: '',
      role: '',
    };
  }

  async componentDidMount() {
    await initFacebookSdk();
    await initGoogleSdk();

  }

  signedUpChange(email, role) {
    this.setState({ signedUp: true, email: email, role: role })
    const { history } = this.props;

    history.push({
      pathname: `/${this.state.role}`,
    });
  }

  render() {
    return (
      <>
        <CalendarContaine />
      </>
    )
  }
};

export default withRouter(Calendar);