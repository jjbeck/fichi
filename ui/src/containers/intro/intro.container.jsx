import React from 'react';
import RegistrationFormContainer from '../../components/registration-form/registration-form.component.jsx';
import './intro.css';
import introImg from '../../assets/images/1@2x-01.svg'


export default class IntroContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="intro-wrapper">
                    <RegistrationFormContainer />
                    <img 
                            className="intro-img"
                            src={introImg}
                        />    
            </div>
        )
    }
};


