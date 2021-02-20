import React, { useState } from 'react';
import './registration-form.css';
import * as utils from '../../utils/validators';

class FormValidation{
    constructor(){
        this.state = {
            fname: true, 
            isLnameValid: true, 
            isAgeValid: true
        }
    }
    getFormStatus(field){
        console.log(this.state[field]);
        return this.state[field];
    }
    setFormStatus(field, rsObj){
        this.state[field] = rsObj.isValid;
    }
}

export default class RegistrationFormComponent extends React.Component {    
    constructor(props) {
        super(props);
        this.form = new FormValidation();
        this.registerUser = this.registerUser.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            showForm: false,
            formButtonLabel: "register",
            isEmailValid: false
        }
    }
    registerUser() {
        const showForm = this.state.showForm;
        if( showForm ) {
            this.setState({showForm: false});
        } else {
            console.info("Registering new User");
            this.setState({showForm: true});
        }
    }
    verifyEmail($event) {
        const rs = utils.validateEmail($event.target.value);
        this.setState({isEmailValid: rs.isValid});
    }
    handleInputChange($event) {
        const whichInput = $event.target.name;
        switch(whichInput) {
            case 'fname':
                const isValid = utils.validateString($event.target.value);
                this.form.setFormStatus('fname', isValid);
                const rs = this.form.getFormStatus('fname')?'valid-input':'invalid-input'
                this.form.setFormStatus('fname', rs);
                break;
            case 'lname':
                break;
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
                        <div>
                            <input 
                                placeholder="Firstname"
                                name="fname"
                                onChange={this.handleInputChange}
                                className={this.form.getFormStatus('fname')}
                            />
                        </div>
                        
                        <input 
                            placeholder="Lastname"
                            name="lname"
                            onChange={this.handleInputChange}
                            className={this.form.getFormStatus('lname')?'valid-input':'invalid-input'}
                        />
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
                    {
                        !this.state.showForm
                        ?
                            <input 
                                placeholder="email"
                                type="email"
                                name="email"
                                autoFocus
                                onKeyUp={this.verifyEmail}
                            />
                        : ""
                    }
                    
                    <button 
                        onClick={this.registerUser}
                        disabled={!this.state.isEmailValid}
                        className={this.state.isEmailValid?'valid-email':'invalid-email'}
                    >
                        {this.state.showForm?'Sign Up':'Register'}
                    </button>
                </div>
            </>
        )
    }
}