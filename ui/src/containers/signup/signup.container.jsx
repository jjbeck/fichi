import React from 'react';
import './signup.css';
import EarlyAccessButtonComponent from '../../components/early-access-button/early-access-button.component.jsx';

export default class SignupContainer extends React.Component {
    render() {
        return (
            <>
                <div className="signup-wrapper">
                    <p>
                    If you would like to receive updates on our launch, access to exlusive content, and early user benefits, enter your email.
                    </p>
                    <p className="button-wrapper">
                        <EarlyAccessButtonComponent />
                        <button className="ghost">
                            Contact Us
                        </button>
                    </p>
                </div>
            </>
        )
    }
}