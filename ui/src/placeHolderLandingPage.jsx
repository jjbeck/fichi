import React from 'react';
import HeaderComponent from './components/header/header.component.jsx';
import IntroContainer from './containers/intro/intro.container.jsx';
import InfoContainer from './containers/info/info.container.jsx';
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
        <HeaderComponent />
        <IntroContainer />
        <InfoContainer/>
        <FooterContainer />
      </div>
    )
  }
};