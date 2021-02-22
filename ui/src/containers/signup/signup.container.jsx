import React from 'react';
import './signup.css';

export default class SignupContainer extends React.Component {
    render() {
        return (
            <>
                <div className="signup-wrapper">
                    <p>
                    If you would like to receive updates on our launch, access to exlusive content, and early user benefits, enter your email.
                    </p>
                    <p className="button-wrapper">
                        <button className="filled">
                            Give me early access
                        </button>
                        <button className="ghost">
                            Contact Us
                        </button>
                    </p>
                </div>
            </>
        )
    }
}