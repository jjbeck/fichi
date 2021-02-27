import React from "react";
import GoogleButton from 'react-google-button'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

import './registration-form.css'

const emailPattern = /.{1,}@[^.]{1,}/


export default class RegistrationFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.emailVal = this.emailVal.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
    this.fbSignIn = this.fbSignIn.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.loadData = this.loadData.bind(this);
    this.state = {
        noError: true,
        disabled: true,
        signedIn: false,
    }
  }

  loadFbLoginApi() {

    window.fbAsyncInit = function() {
        FB.init({
            appId      : window.ENV.FB_APP_ID,
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use version 2.1
        });
    };

    console.log("Loading fb api");
      // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  async componentDidMount() {
    this.loadFbLoginApi();
    console.log("Is user signed in", this.state.signedIn);
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ clientId: clientId }).then(() => {
          this.setState({ disable: false })
        })
      }
    })
    await this.loadData();
    console.log("Is user signed in", this.state.signedIn);
  }

  async loadData() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, givenName } = result;
    this.setState({ signedIn });

  }
  async googleSignIn() {
    console.log('clicke');
    let googleToken;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      googleToken = googleUser.getAuthResponse().id_token;
    } catch (error) {
      console.log(error);
    }
    
    try {
      const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
      const response = await fetch(`${apiEndpoint}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ google_token: googleToken }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      const { signedIn, givenName } = result;
      this.setState({ signedIn: signedIn })
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async signOut() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    
    try {
      await fetch(`${apiEndpoint}/signout`, {
        method: 'POST',
      });
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      this.setState({ signIn: false });
    } catch(error) {
      console.log(error);
    }
  }

  logAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    });
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      console.log(response);
      this.logAPI();
    } else if (response.status === 'not_authorized') {
        console.log("Please log into this app.");
    } else {
        console.log("Please log into this facebook.");
    }
  }

  async fbSignIn() {
      FB.login(function(response) {
        this.statusChangeCallback(response)
      }.bind(this), {scope: 'email'});
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
                  <input className="email-input" type="text" placeholder="Enter email"></input>
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
              <h3>Or: </h3>
              <div className="link-container">
                <ul>
                  <li onClick={this.fbSignIn}><i><FacebookLoginButton /></i></li>
                  <li onClick={this.googleSignIn}><i><GoogleLoginButton /></i></li>
                </ul>
              </div>
            </div>

          </div>
      );
  }
};
