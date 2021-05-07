import React from 'react';

import SSO from './services/sso.factory.js';
import toastify from './components/toast/toast.js';
import ToastContainerCustom from './components/toast/toastcontainer.jsx';
import Contents from './Contents.jsx';
import HeaderComponent from './components/header/header.component.jsx';
import initGoogleSDK from './components/auth/initGoogleSDK.js';
import GoogleFactory from "./services/google.factory.js";

import UserContext from './UserContext.js';

const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
const ssoSign = new SSO(apiEndpoint);
const googleFactory = new GoogleFactory(apiEndpoint);

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { signedIn: false, userId: '', email: '', name: '' } };
    this.onUserChange = this.onUserChange.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  async componentDidMount() {
    const response = await ssoSign.loadData();
        if (response) {
          toastify(response, 'error');
        } else {
          this.setState({ user: {signedIn: ssoSign.signedIn, email: ssoSign.email, name: ssoSign.name }})
        }
        const authResponse = await initGoogleSDK();
        if (authResponse) toastify(authResponse, 'error');
      }

  async deleteAccount(email) {
    const user = this.context;
      const response =  await googleFactory.deleteAccount(user.email);
      if (response) {
        toastify(response, 'error');
      } else {
        const user = { signedIn: googleFactory.signedIn, email: '', name: '' };
        this.setState({ user });
        toastify('You have deleted your account');
      }
    
  }

  async signOut(e) {
    console.log('signed out');
       
    googleFactory.signOut().then(() =>{this.setState({user: { signedIn: googleFactory.signedIn, name: '', email: '' }})});
    toastify('You have signed out');
  
}
  

  onUserChange(user) { 
    this.setState({ user })
  }

  render() {

    const { user } = this.state;

    return (
      <div>
        <UserContext.Provider value={user}>
          <HeaderComponent deleteAccount={this.deleteAccount} signOut={this.signOut}/>
        </UserContext.Provider>
        <UserContext.Provider value={user}>
          <Contents onUserChange={this.onUserChange}/>
        </UserContext.Provider>
      </div>
    );

  }
}

