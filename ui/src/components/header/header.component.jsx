import React from 'react';
import { Link } from 'react-router-dom'
import  './header.css'
import { Glyphicon } from 'react-bootstrap';


import UserContext from '../../UserContext.js';
import logo from '../../assets/images/Logo_smaller.svg'

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.context;
        if (user.signedIn === false) {
            return(
                <div id="header-container">
                <div className="logo-wrapper">
                <img 
                            className="logo-img"
                            src={logo}
                        />   
                </div>
                
                <div id="navlinks">
                <div id="dropdown">
                <a href="/welcome"><button id="input-button">ABOUT US</button></a>
                </div>  
               
               </div>
               </div>
               
            )
        } else {
            return (
                <div id="header-container">
                <div className="logo-wrapper">
                <img 
                            className="logo-img"
                            src={logo}
                        />   
                </div>
                <div id="navlinks">
              
                 <div id="dropdown">
                    <button id="dropbtn"><button id="input-button">ACCOUNT</button>
                    <i className="fa fa-caret-down"></i>
                    </button>
                    <div id="dropdown-content">
                    <a href="/welcome">Profile</a>
                    <a onClick={this.props.signOut}>Sign Out</a>
                    <a onClick={this.props.deleteAccount}>Delete Account</a>
                    </div>
                </div>
                <a href="/calendar"><button id="input-button">CALENDAR</button></a>
                <a href="/welcome"><button id="input-button">ABOUT US</button></a>
                </div>
                </div>
            )
            }
    }
};

HeaderComponent.contextType = UserContext;

export default HeaderComponent;