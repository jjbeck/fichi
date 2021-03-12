import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import FacebookLogin from 'react-facebook-login';

import './registration-form.css'
import graphQLFetch from '../../api_handlers/graphQLFetch.js'
import initGoogleSDK from '../auth/initGoogleSDK.js';
import SSO from '../../services/sso.factory.js'
import GoogleFactory from "../../services/google.factory";
import FacebookFactory from "../../services/facebook.factory.js"
import toastify from '../toast/toast.js';
import ToastContainerCustom from '../toast/toastcontainer.jsx';

const emailPattern = /.{1,}@[^.]{1,}/
const FB_APP_ID = process.env.FB_APP_ID;

const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
const ssoSign = new SSO(apiEndpoint);
const facebookFactory = new FacebookFactory(apiEndpoint);
const googleFactory = new GoogleFactory(apiEndpoint);


export default class RegistrationFormContainer extends React.Component {
  constructor(props) {
    super(props);
    const apiEndpoint = window.ENV.apiEndpoint;
    this.googleFactory = new GoogleFactory(apiEndpoint)
    this.emailVal = this.emailVal.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.SignOut = this.SignOut.bind(this);
    this.fbSignIn = this.fbSignIn.bind(this);
    
    this.deleteAccount = this.deleteAccount.bind(this);
    this.state = {
        signedIn: false,
        email: '',
        name: '',
    }
  }

  async componentDidMount() {
    await ssoSign.loadData()
    await initGoogleSDK();
    this.setState({ signedIn: ssoSign.signedIn, email: ssoSign.email, name: ssoSign.name })
  }

  async deleteAccount(e) {
    if (e.target.name === 'facebook') {
      await facebookFactory.deleteAcount(this.state.email).then(() => {this.setState({ signedIn: facebookFactory.signedIn })});
      console.log(this.state.signedIn);
    } else if (e.target.name === 'google') {
      googleFactory.deleteAccount(this.state.email).then(() =>{this.setState({ signedIn: googleFactory.signedIn })});
    }
  }

  async googleSignIn(e) {
    const { showSuccess } = this.props;  
    await googleFactory.signIn().then(() => { this.setState({ signedIn: googleFactory.signedIn, email: googleFactory.email, name: googleFactory.name }) }); 
    toastify('signed in');
  }

  async SignOut(e) {
    if (e.target.name === 'facebook') {
      await facebookFactory.signOut().then(() => {this.setState({ signedIn: facebookFactory.signedIn })});;
    } else if (e.target.name === 'google') {
      googleFactory.signOut().then(() =>{this.setState({ signedIn: googleFactory.signedIn })});;
    }
  }

  async fbSignIn(response) {
    const facebookFactory = new FacebookFactory(apiEndpoint, response);
    facebookFactory.signIn().then(() => {this.setState({ signedIn: facebookFactory.signedIn })});;  
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
      facebookButton = <><button name="facebook" onClick={this.SignOut}>sign out</button><button name="facebook" onClick={this.deleteAccount}>delete</button></>
    } else {
      googleButton = <GoogleLoginButton value="google" onClick={this.googleSignIn}/>
      facebookButton= <FacebookLogin appId={window.ENV.FB_APP_ID} autoLoad={true} callback={this.fbSignIn} onClick={this.fbSignIn} />
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
            <ToastContainerCustom />
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
//write comments
//make toast to give user info