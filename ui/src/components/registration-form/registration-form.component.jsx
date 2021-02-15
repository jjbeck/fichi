import { info } from 'console';
import React from 'react';
import './registration-form.css';
import graphQLFetch from '../../api_handlers/graphQLFetch.js'

export default class RegistrationFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.verifyFName = this.verifyFName.bind(this);
        this.verifyLName = this.verifyLName.bind(this);
        this.verifyAge = this.verifyAge.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
        this.submitInfo = this.submitInfo.bind(this);
        this.verifyRole = this.verifyRole.bind(this);

        this.state = {
            showForm: false,
            formButtonLabel: "register",
            isEmailValid: false,
            emailSubmit: false,
            email: '',
            info: {
                fname: '',
                lname: '',
                age: '',
                role: '',
            },
            errors: {
                fname: true,
                lname: true,
                age: true,
                role: true,
            },
            errorMessages: {
                fname: '',
                lname: '',
                age: '',
                role: '',
            }
        }
    }

    onEmailChange(e) {
        e.preventDefault();
        this.setState({ email: e.target.value })
    }

    onFormChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            info: { ...prevState.info, [name]: value },
            }));
    }

    async submitEmail() {
        const { email } = this.state;
        const query = 'mutation setUserInfo($info: SetUSERINFO!) { setUserInfo(info: $info) { email } }'
        const response = await graphQLFetch(query, { info: {'email': email  } } );

        if (response.data) {
            this.setState({ emailSubmit: true, showForm: true })
        } else {
            console.log('email submit failed')
        }
    }

    async submitInfo() {
        const { email, info, errors } = this.state;

        const query = 'mutation updateUserInfo($email: String!, $changes: UpdateUSERINFO!) { updateUserInfo(email: $email, changes: $changes) { fname role } }';

        const response = await graphQLFetch(query, { 'email': email, changes: info });

        if (response.data) {
          this.setState({ showForm: false });
          console.log('info submit');
          this.props.signedUpChange(this.state.email, this.state.info.role)
          const titleElement = document.getElementById('how-it-works-top')
          titleElement.scrollIntoView({ behavior: 'smooth' })
        } else {
            console.log('submit info failed');
        }

        
    }

    verifyFName($event) {
        const namePattern = /^[a-zA-Z]+$/;
        const stateCopy = Object.assign({}, this.state)
    
        // Verify user entered first name
        if ($event.target.value.length === 0 && $event.target.name === 'fname') {
            stateCopy.errorMessages['fname'] = 'Please enter first name';
            this.setState({ stateCopy })
        } else if (!namePattern.test($event.target.value)) {
            stateCopy.errorMessages['fname'] = 'Only letters allowed';
            this.setState({ stateCopy })
        } else {
            stateCopy.errors['fname'] = false;
            stateCopy.errorMessages['fname'] = '';
            this.setState({ stateCopy })
        }
        
    }

    verifyLName($event) {
        const namePattern = /^[a-zA-Z]+$/;
        const stateCopy = Object.assign({}, this.state)
    
        // Verify user only used letters if last name entered
        if ($event.target.value.length > 0 && !namePattern.test($event.target.value)) {
            stateCopy.errorMessages['lname'] = 'Only letters allowed';
            this.setState({ stateCopy })
        } else {
            stateCopy.errors['lname'] = false;
            stateCopy.errorMessages['lname'] = false;
            this.setState({ stateCopy })
        }
    }

    verifyAge($event) {
        const agePattern = /^[0-9]*$/;
        const stateCopy = Object.assign({}, this.state)

        // Verify age contains only integers
        if ($event.target.value.length > 0 && !agePattern.test($event.target.value))  {
            stateCopy.errorMessages['age'] = 'Only numbers allowed';
            this.setState({ stateCopy })
        } else {
            stateCopy.errors['age'] = false;
            stateCopy.errorMessages['age'] = '';
            this.setState({ stateCopy })
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

    verifyRole($event) {
        const stateCopy = Object.assign({}, this.state);
        stateCopy.errors['role'] = false;
        this.setState({ stateCopy })
    }

    render() {
        const { errors } = this.state;
        let errorPres;
        if (Object.values(errors).indexOf(true) > -1) {
            errorPres = true;
         } else {
            errorPres = false;
         }

        return (
            <>
                <div 
                    className={this.state.showForm?'form-wrapper form-shown':'form-wrapper form-hidden'}
                >
                    <form noValidate>
                        <h3>User Registration</h3>
                        <input onBlur={this.verifyFName} name="fname" onChange={this.onFormChange} placeholder="Firstname"/>
                        <span className="error">{this.state.errorMessages.fname}</span>
                        <input onBlur={this.verifyLName} name="lname" onChange={this.onFormChange} placeholder="Lastname"/>
                        <span className="error">{this.state.errorMessages.lname}</span>
                        <input onBlur={this.verifyAge} name="age" onChange={this.onFormChange} placeholder="age"/>
                        <span className="error">{this.state.errorMessages.age}</span>
                        <div className="role-wrapper">
                            <span>
                                <input 
                                    type="radio" 
                                    id="creator"
                                    name="role"
                                    value="creator"
                                    onClick={this.verifyRole}
                                    onChange={this.onFormChange}
                                />
                                <label htmlFor="creator">Creator</label>
                            </span>
                            <span>
                                <input 
                                    type="radio" 
                                    id="consumer"
                                    name="role"
                                    value="consumer"
                                    onClick={this.verifyRole}
                                    onChange={this.onFormChange}
                                />
                                <label htmlFor="consumer">Consumer</label>
                            </span>
                        </div>
                    </form>
                    <button disabled={errorPres} className={!errorPres?"button-submit-info":"button-submit-info-disabled"} onClick={this.submitInfo}>Submit Info</button>
                </div>
                <div className={this.state.emailSubmit?"intro-email-form-hidden":"intro-email-form"}>
                    <input 
                        placeholder="email"
                        type="email"
                        name="email"
                        autoFocus
                        onKeyUp={this.verifyEmail}
                        onChange={this.onEmailChange}
                    />
                    <button 
                        onClick={this.submitEmail}
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