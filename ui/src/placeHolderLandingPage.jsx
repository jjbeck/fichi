import React from 'react';
import NavBarComponent from './components/navbar/navbar.component.jsx';
import IntroContainer from './containers/intro/intro.container.jsx';
import HowItWorksContainer from './containers/how-it-works/how-it-works.container.jsx';
import FooterContainer from './containers/footer/footer.container.jsx';

import './global.css';
export default class LandingPage extends React.Component {
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
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <NavBarComponent />
        <IntroContainer signedUpChange={this.signedUpChange}/>
        <HowItWorksContainer signedUp={this.state.signedUpChange} role={this.state.role}/>
        <FooterContainer />
      </div>
    )
  }
};