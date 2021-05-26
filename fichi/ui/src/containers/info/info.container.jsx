import React from 'react';
import './info.css';
import creatorImg from '../../assets/images/2@2x.svg';
import userImg from '../../assets/images/3@2x.svg';
import commImg from '../../assets/images/4@2x.svg';

export default class InfoContainer extends React.Component {
    render() {
        return (
            <div className="info-wrapper">
                <div className="steps-wrapper">
                    <div className="img-wrapper">
                        <img 
                            className="creatorImg"
                            src={creatorImg}
                        />
                    </div>
                    
                    <p>
                        <h1 className="header-text">Share what drives you.</h1>
                        <h2 className="sub-header-text">You want to make the world a healthier place, and you love motivating people. So we decided to provide the platform. All you have to do is provide the content.</h2>

                    </p> 
                </div>

                <div className="steps-wrapper">
                    <p>
                        <h1 className="header-text">Find your perfect workout.</h1>
                        <h2 className="sub-header-text">From burpees to push-ups to jazzercise in spandex, you will always find the workout for you. Anytime, any day, anywhere.</h2>

                    </p> 
                    <div className="img-wrapper">
                        <img 
                            className="userImg"
                            src={userImg}
                        />
                    </div>
                </div>

                <div className="steps-wrapper">
                    <div className="img-wrapper">
                        <img 
                            className="commImg"
                            src={commImg}
                        />
                        
                    </div>
                    <p>
                        <h1 className="header-text">Find your workout buddies.</h1>
                        <h2 className="sub-header-text">We're all in this together. Subscribe, chat and connect with your community. Get advice straight from the source and share what you've learned. Nothing's better than working out with friends.</h2>
                    </p> 
                </div>
            </div>
        )
    }
}