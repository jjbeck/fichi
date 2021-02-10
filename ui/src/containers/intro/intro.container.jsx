import React from 'react';
import RegistrationFormContainer from '../../components/registration-form/registration-form.component.jsx';
import './intro.css';

export default class IntroContainer extends React.Component {
     

    render() {
        return (
            <>
                <div className="intro-wrapper">
                    {/* <h3>{this.state.showForm}</h3>
                    <div 
                        className={this.state.showForm?'overlay show-overlay':'overlay hide-overlay'}
                    ></div> */}
                    <div 
                        className='panel-wrapper'
                    >
                        <div className="panel left">
                            {/* <div className="overlay show-overlay"></div> */}
                        </div>
                        <div className="panel right"></div>
                        <RegistrationFormContainer/>
                    </div>
                    
                </div>
                
            </>
        )
    }
};