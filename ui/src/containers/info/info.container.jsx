import React from 'react';
import './info.css';
import galleryImg from '../../assets/images/gallery.svg';
import connectImg from '../../assets/images/connect.svg';
import schedulingImg from '../../assets/images/scheduling.svg';
import socialImg from '../../assets/images/social.svg';

export default class InfoContainer extends React.Component {
    render() {
        return (
            <div className="info-wrapper">
                <h3>How It Works</h3>

                <div className="steps-wrapper">
                    <div className="img-wrapper">
                        <img 
                            width="200" 
                            height="200"
                            src={socialImg}
                        />
                        <video width="400" controls>
                            <source src="mov_bbb.mp4" type="video/mp4" />
                            <source src="mov_bbb.ogg" type="video/ogg" />
                            Your browser does not support HTML video.
                        </video>
                        <button className="ghost right-align">Learn More</button>
                    </div>
                    
                    <p>
                        <h3>Share what drives you.</h3>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p> 
                </div>

                <div className="steps-wrapper">
                    <p>
                        <h3>Find your perfect workout.</h3>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p> 
                    <div className="img-wrapper">
                        <img 
                            width="200" 
                            height="200"
                            src={schedulingImg}
                        />
                        <video width="400" controls>
                            <source src="mov_bbb.mp4" type="video/mp4" />
                            <source src="mov_bbb.ogg" type="video/ogg" />
                            Your browser does not support HTML video.
                        </video>
                        <button className="ghost left-align">Learn More</button>
                    </div>
                </div>

                <div className="steps-wrapper">
                    <div className="img-wrapper">
                        <img 
                            width="200" 
                            height="200"
                            src={galleryImg}
                        />
                        <video width="400" controls>
                            <source src="mov_bbb.mp4" type="video/mp4" />
                            <source src="mov_bbb.ogg" type="video/ogg" />
                            Your browser does not support HTML video.
                        </video>
                        <button className="ghost right-align">Learn More</button>
                    </div>
                    <p>
                        <h3>Join your community and connect with trainers.</h3>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p> 
                </div>
            </div>
        )
    }
}