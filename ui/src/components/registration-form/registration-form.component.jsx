import React from 'react';
import './registration-form.css';

export default class RegistrationFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.showForm = this.showForm.bind(this);
        this.state = {
            showForm: false
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
            <button onClick={this.showForm}>Sign Up</button>
            </>
        )
    }
}