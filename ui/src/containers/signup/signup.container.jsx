import React from 'react';
import './signup.css';
import EarlyAccessButtonComponent from '../../components/early-access-button/early-access-button.component.jsx';
import UserContext from '../../UserContext.js';

class SignupContainer extends React.Component {

    render() {
        const user = this.context;
        if (user.signedIn === true) {
            return(
                null
            )
        } else {
        return (
            <>
                <div className="signup-wrapper">
                    <h1 className="sub-header-text" id="signup-form-header">
                    If you would like to receive updates on our launch, access to exlusive content, and early user benefits, enter your email.
                    </h1>
                    <p className="button-wrapper">
                        <EarlyAccessButtonComponent id="input-button"/>
                       
                    </p>
                </div>
            </>
        )
        }
    }
}

SignupContainer.contextType = UserContext;

export default SignupContainer;