import React from 'react';
import HeaderComponent from './components/header/header.component.jsx';
import IntroContainer from './containers/intro/intro.container.jsx';
import InfoContainer from './containers/info/info.container.jsx';
import FooterContainer from './containers/footer/footer.container.jsx';
import SignupContainer from './containers/signup/signup.container.jsx';
import './global.css';
import { withRouter } from 'react-router-dom';

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
        <HeaderComponent />
        <IntroContainer />
        <InfoContainer/>
        <SignupContainer/>
        <FooterContainer />
      </>
    )
  }
};

export default withRouter(LandingPage);