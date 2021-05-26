import React, { useContext } from 'react';

import RegistrationFormContainer from '../../components/registration-form/registration-form.component.jsx';
import './intro.css';
import introImg from '../../assets/images/1@2x-01.svg'






function IntroContainer() {
   
        
    
        return (
            <div id="intro-wrapper">
                    <RegistrationFormContainer
                     />
                    <img 
                            className="intro-img"
                            src={introImg}
                        />    
            </div>
        )
    };



export default IntroContainer;
