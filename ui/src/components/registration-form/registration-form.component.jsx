import React from "react";
import { faFacebook, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './registration-form.css'

const emailPattern = /.{1,}@[^.]{1,}/

const styles = {
  dialogPaper: {
      minHeight: '80vh',
      maxHeight: '80vh',
  },
};

export default class RegistrationFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.emailVal = this.emailVal.bind(this);
    this.socialSignIn = this.socialSignIn.bind(this);
    this.state = {
        noError: true,
        disabled: true,
    }
  }

  componentDidMount() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ clientId: clientId }).then(() => {
          this.setState({ disable: false })
        })
      }
    })
  }

  async socialSignIn() {
    console.log('clicke');
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const givenName = googleUser.getBasicProfile().getGivenName();
      console.log(givenName);
    } catch (error) {
      console.log(error);
    }

  }

  emailVal(e) {
      const error = emailPattern.test(e.target.value);
      console.log(error);
      this.setState({ noError: error });
  }
  render() {
    const { classes } = this.props;
    return (
          <div className="email-wrapper">
            <div className="email-top">
              <h2>Where creators and people come to get fit together.</h2>
              <form>
                <div className="input-wrapper">
                  <input type="text" placeholder="email"></input>
                </div>
                <div className="input-wrapper">
                  <h6>We will never share your information.</h6>
                </div>
                <div className="input-wrapper">
                  <button id="input-button" type="submit">Sign me up</button>
                </div>
              </form>
            </div>
            <div className="email-bottom">
              <h3>Or sign up with: </h3>
              <div className="link-container">
                <ul>
                  <li><i><FontAwesomeIcon icon={faFacebook} /></i></li>
                  <li onClick={this.socialSignIn}><i><FontAwesomeIcon icon={faGoogle} /></i></li>
                </ul>
              </div>
            </div>

          </div>
      );
  }
};
