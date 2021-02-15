import React from 'react';
import NavBarComponent from './components/navbar/navbar.component.jsx';
import IntroContainer from './containers/intro/intro.container.jsx';
import RouteContent from './routes/routeContent.jsx'
import FooterContainer from './containers/footer/footer.container.jsx';

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
    console.log(this.state);
    return (
      <div>
        <NavBarComponent />
        <IntroContainer signedUpChange={this.signedUpChange}/>
        <RouteContent />
        <FooterContainer />
      </div>
    )
  }
};

export default withRouter(LandingPage);