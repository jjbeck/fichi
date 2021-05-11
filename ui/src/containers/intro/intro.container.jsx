import React from 'react';
import RegistrationFormContainer from '../../components/registration-form/registration-form.component.jsx';
import './intro.css';
import introImg from '../../assets/images/1@2x-01.svg'
import GoogleFactory from "../../services/google.factory.js";
import toastify from '../../components/toast/toast.js'

import UserContext from '../../UserContext.js';


const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
const googleFactory = new GoogleFactory(apiEndpoint);

class IntroContainer extends React.Component {
    constructor(props) {
        super(props)
        const apiEndpoint = window.ENV.apiEndpoint;
        this.googleFactory = new GoogleFactory(apiEndpoint)
        this.emailVal = this.emailVal.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.formSignIn = this.formSignIn.bind(this);  
    }
    
      async googleSignIn(e) {
        const { showSuccess } = this.props;
        const response = await googleFactory.signIn();
        if (response) {
          toastify(response, 'error');
        } else {
          const user = { signedIn: googleFactory.signedIn, email: googleFactory.email, name: googleFactory.name };
          this.props.onUserChange(user);
          toastify('You are signed in');
        }
      }

      async formSignIn(e) {
        e.preventDefault();
        console.log('submit');
      }
    
      emailVal(e) {
          const error = emailPattern.test(e.target.value);
          console.log(error);
          this.setState({ noError: error });
      }

    render() {   
        return (
            <div id="intro-wrapper">
                    <RegistrationFormContainer
                    googleSignIn={this.googleSignIn}
                    formSignIn={this.formSignIn}
                     />
                    <img 
                            className="intro-img"
                            src={introImg}
                        />    
            </div>
        )
    }
};

IntroContainer.contextType = UserContext;

export default IntroContainer;
