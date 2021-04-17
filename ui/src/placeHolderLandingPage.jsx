import React from 'react';

import IntroContainer from './containers/intro/intro.container.jsx';
import InfoContainer from './containers/info/info.container.jsx';
import FooterContainer from './containers/footer/footer.container.jsx';
import SignupContainer from './containers/signup/signup.container.jsx';
import './global.css';
import { withRouter } from 'react-router-dom';

import initFacebookSdk from './components/auth/initFacebookSDK.js'
import initGoogleSdk from './components/auth/initGoogleSDK.js'

class LandingPage extends React.Component {
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
        <IntroContainer />
        <InfoContainer/>
        <SignupContainer/>
        <FooterContainer />
      </>
    )
  }
};

export default withRouter(LandingPage);