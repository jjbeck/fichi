import React from 'react';
export default class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      signedUp: false
    };
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "This person has not signed up"));
  }

}
;