import React from 'react';

import SignUpForm from './signUpEmail.jsx';

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
        <h2>
          This person has not signed up
        </h2>
        <SignUpForm />
      </div>
      )
  }
};