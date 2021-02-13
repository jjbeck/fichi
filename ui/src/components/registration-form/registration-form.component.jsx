import React from 'react';
import './registration-form.css';

export default class RegistrationFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.showForm = this.showForm.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.state = {
            showForm: false,
            formButtonLabel: "register",
            isEmailValid: false
        }
    }
    showForm() {
        const showForm = this.state.showForm;
        if( showForm ) {
            this.setState({showForm: false});
        } else {
            console.info("Registering new User");
            this.setState({showForm: true});
        }
    }
    verifyEmail($event) {
        const pattern = /^\S+@\S+\.\S+$/;
        if(pattern.test($event.target.value)){
            this.setState({isEmailValid: true});
        }else{
            this.setState({isEmailValid: false});
        }
    }
    render() {
        return (
            <>
                <div 
                    className={this.state.showForm?'form-wrapper form-shown':'form-wrapper form-hidden'}
                >
                    <form>
                        <h3>User Registration</h3>
                        <input placeholder="Firstname"/>
                        <input placeholder="Lastname"/>
                        <input placeholder="age"/>
                        <div className="role-wrapper">
                            <span>
                                <input 
                                    type="radio" 
                                    id="creator"
                                    name="role"
                                    value="creator"
                                />
                                <label htmlFor="creator">Creator</label>
                            </span>
                            <span>
                                <input 
                                    type="radio" 
                                    id="consumer"
                                    name="role"
                                    value="consumer"
                                />
                                <label htmlFor="consumer">Consumer</label>
                            </span>
                        </div>
                    </form>
                </div>
                <div className="intro-email-form">
                    <input 
                        placeholder="email"
                        type="email"
                        name="email"
                        autoFocus
                        onKeyUp={this.verifyEmail}
                    />
                    <button 
                        onClick={this.showForm}
                        disabled={!this.state.isEmailValid}
                        className={this.state.isEmailValid?'valid-email':'invalid-email'}
                    >
                        {this.state.isEmailValid?'Sign Up':'Register'}
                    </button>
                </div>
            </>
        )
    }
}