import React from 'react';
import './how-it-works.css';
import galleryImg from '../../assets/images/gallery.svg';
import connectImg from '../../assets/images/connect.svg';
import schedulingImg from '../../assets/images/scheduling.svg';
import socialImg from '../../assets/images/social.svg';

export default class HowItWorksContainer extends React.Component {
    render() {
        return (
            <div className="how-it-works-wrapper">
                <h3>How It Works</h3>

                <div className="steps-wrapper">
                    <img 
                        width="200" 
                        height="200"
                        src={socialImg}
                    />
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p> 
                </div>

                <div className="steps-wrapper">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p> 
                    <img 
                        width="200" 
                        height="200"
                        src={schedulingImg}
                    />
                </div>

                <div className="steps-wrapper">
                    <img 
                        width="200" 
                        height="200"
                        src={galleryImg}
                    />
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p> 
                </div>
                <div className="steps-wrapper">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p> 
                    <img 
                        width="200" 
                        height="200"
                        src={connectImg}
                    />
                </div>
            </div>
        )
    }
}