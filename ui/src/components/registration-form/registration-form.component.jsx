import React from "react";
import GoogleButton from 'react-google-button'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

import './registration-form.css'
import graphQLFetch from '../../api_handlers/graphQLFetch.js'

const emailPattern = /.{1,}@[^.]{1,}/
const FB_APP_ID = process.env.FB_APP_ID;


export default class RegistrationFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.emailVal = this.emailVal.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.SignOut = this.SignOut.bind(this);
    this.loadFbLoginApi = this.loadFbLoginApi.bind(this);
    this.fbSignIn = this.fbSignIn.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.loadData = this.loadData.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.state = {
        noError: true,
        ssoDisabled: true,
        signedIn: false,
        email: '',
        name: '',
    }
  }

  async componentDidMount() {
    // Check if user session still active in cookie
    await this.loadData();
    // Initialize facebook login API
    this.loadFbLoginApi();
    // Get env var for api and google app ID
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    // Initialize google login API
    if (!clientId) return;
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ clientId: clientId }).then(() => {
          this.setState({ ssodDisabled: false })
        })
      }
    })
  }

  async loadData() {
    // Get env var for api
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    // Use backend to check if user credentials in cookie
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
    });

    if ([400].includes(response.status)) console.log('errrr');
    // if cookie session backend sends response
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, name, email } = result;

    // set state based on reponse from backend
    this.setState({ signedIn, name, email });

  }

  async deleteAccount(e) {

    if (e.target.name === 'facebook') {
      FB.api('/me/permissions', 'delete', null, () => FB.logout());
    }
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const { email } = this.state;
    try {
      const response = await fetch(`${apiEndpoint}/deleteaccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email }),

      });

      if ([400].includes(response.status)) console.log('errrr');
      const auth2 = window.gapi.auth2.getAuthInstance();
      const body = await response.text();
      const result = JSON.parse(body);
      await auth2.signOut();
      this.setState({ signedIn: false });
      console.log(this.state);
    } catch(error) {
      console.log(error);
    }
  }

  async googleSignIn(e) {
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

      if ([400, 403].includes(response.status)) console.log('errrr');
      const body = await response.text();
      const result = JSON.parse(body);

      const { signedIn, fname, email } = result;
      this.setState({ signedIn: signedIn, name: fname, email })
    } catch (error) {
      console.log(error);
      // To do: handle error to logout of everything if goes wrong
    }
  }

  async SignOut(e) {
    if (e.target.name === 'facebook') {
      FB.api('/me/permissions', 'delete', null, () => FB.logout());
    }
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    try {
      const response = await fetch(`${apiEndpoint}/signout`, {
        method: 'POST',
      });
      const auth2 = window.gapi.auth2.getAuthInstance();
      const body = await response.text();
      const result = JSON.parse(body);
      await auth2.signOut();
      this.setState({ signedIn: false });
    } catch(error) {
      console.log(error);
    }
  }

  loadFbLoginApi() {

    // full facebooke initialization
    window.fbAsyncInit = function() {
        FB.init({
            appId      : window.ENV.FB_APP_ID,
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use version 2.1
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.logAPI();
    } else if (response.status === 'not_authorized') {
        console.log("Please log into this app.");
    } else {
        console.log("Please log into this facebook.");
    }
  }

  logAPI() {
    FB.api('/me', function(response) {
    });
  }

  async fbSignIn() {
    let facebookToken;
    FB.login(async function(response) {
      this.statusChangeCallback(response)
      facebookToken = response.authResponse.accessToken;

      try {
        const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
        const response = await fetch(`${apiEndpoint}/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ facebook_token: facebookToken }),
        });

        if ([400].includes(response.status)) console.log('errrr');
        const body = await response.text();
        const result = JSON.parse(body);
        const { signedIn, fname, email } = result;
        this.setState({ signedIn: signedIn, name: fname, email });
      } catch (error) {
        console.log(error);
      }


      
    }.bind(this), {scope: 'email'});
  
}

  emailVal(e) {
      const error = emailPattern.test(e.target.value);
      console.log(error);
      this.setState({ noError: error });
  }
  render() {
    const { classes } = this.props;
  
    let googleButton;
    let facebookButton;
    if (this.state.signedIn === true) {
      googleButton = <><button name="google" onClick={this.SignOut}>sign out</button><button name="google" onClick={this.deleteAccount}>delete</button></>
      facebookButton = <><button name="facebook" onClick={this.SignOut}>sign out</button><button name="google" onClick={this.deleteAccount}>delete</button></>
    } else {
      googleButton = <GoogleLoginButton value="google" onClick={this.googleSignIn}/>
      facebookButton= <FacebookLoginButton onClick={this.fbSignIn} />
    }

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
                  <li><i>{facebookButton}</i></li>
                  <li><i>{googleButton}</i></li>
                </ul>
              </div>
            </div>

          </div>
      );
  }
};

/* Login workflow
1. On succes login, return access token
2. end acces token to backend to authenticate with google or facebook
3. on success return JWT token (make expired one once finished) and store as cookie and create user account
*/

//To do: double check that any error returned immediately logs out user
// Clean up code and write comments 
// To do: handle error to logout of everything if goes wrong