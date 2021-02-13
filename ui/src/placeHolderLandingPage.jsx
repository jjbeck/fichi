import React from 'react';
import NavBarComponent from './components/navbar/navbar.component.jsx';
import IntroContainer from './containers/intro/intro.container.jsx';
import HowItWorksContainer from './containers/how-it-works/how-it-works.container.jsx';
import FooterContainer from './containers/footer/footer.container.jsx';

import './global.css';
export default class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      signedUp: false,
    };
  }

  render() {
    return (
      <div>
        <NavBarComponent />
        <IntroContainer />
        <HowItWorksContainer/>
        <FooterContainer />
      </div>
    )
  }
};