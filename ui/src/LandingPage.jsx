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
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await initFacebookSdk();
    await initGoogleSdk();
  }

  render() {
    return (
      <>
        <IntroContainer onUserChange={this.props.onUserChange} />
        <InfoContainer/>
        <SignupContainer/>
        <FooterContainer />
      </>
    )
  }
};

export default withRouter(LandingPage);