import React from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LinkContainer } from 'react-router-bootstrap';
import './registration-form.css'
import ToastContainerCustom from '../toast/toastcontainer.jsx';

import UserContext from '../../UserContext.js';


class RegistrationFormContainer extends React.Component {
  constructor(props) {
    super(props);
  }
   
  render() {
    const user = this.context;
    const { googleSignIn } = this.props;

    
    let googleButton;
    let facebookButton;
    if (user.signedIn === true) {
      return (
        <div className="email-wrapper">
            <div className="email-top">
              <h1 className="header-text">Where creators and people come to get fit together.</h1>
             
              
              <hr className="email-line"/>
            </div>
            <div className="email-bottom">
            
               <div >
              <LinkContainer exact to="/calendar"><button  id="input-button" name="calendar-link" >ACCESS YOUR CALENDAR</button></LinkContainer>
             
              </div>
            </div>
            <ToastContainerCustom />
          </div>

      )
    } else {
      return (
        <div className="email-wrapper">
            <div className="email-top">
              <h1 className="header-text">Where creators and people come to get fit together.</h1>
              <div className="input-wrapper">
                  <h2 className="sub-header-text">Fichi is launching soon. Enter your email to recieve an invitation.</h2>
                </div>
              <form onSubmit={this.props.formSignIn}>
                <div className="input-wrapper">
                  <input className="email-input" type="text" placeholder="Enter email"></input>
                </div>
                <div className="input-wrapper">
                  <input className="password-input" type="text" placeholder="Enter password"></input>
                </div>
                <div className="input-wrapper">
                  <button id="input-button" type="submit">GIVE ME EARLY ACCESS</button>
                </div>
              </form>
              <hr className="email-line"/>
            </div>
            <div className="email-bottom">
            
               <div >
              <GoogleLoginButton styleid="google-button" value="google" onClick={googleSignIn}/>
              </div>
            </div>
            <ToastContainerCustom />
          </div>
      )
     
      
    }
  }
};

RegistrationFormContainer.contextType = UserContext;
export default RegistrationFormContainer;



/* Login workflow
1. On succes login, return access token
2. end acces token to backend to authenticate with google or facebook
3. on success return JWT token (make expired one once finished) and store as cookie and create user account
*/

//To do: double check that any error returned immediately logs out user
//write comments
//make toast to give user info