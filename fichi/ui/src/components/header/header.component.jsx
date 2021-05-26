import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import  './header.css'
import { Glyphicon } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import UserContext from '../../UserContext.js';
import logo from '../../assets/images/Logo_smaller.svg'


const cookies = new Cookies();



function HeaderComponent () {
    
    
        const { user, setUser } = useContext(UserContext);
       
        const signOut = (e) => {
            e.preventDefault();
            cookies.remove('token');
            
            setUser({ signedIn: false, email: '', userId: '', name: ''})
        }
        
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
                <Link to="/welcome">
                <img 
                            className="logo-img"
                            src={logo}
                        /> 
                </Link>  
                </div>
                <div id="navlinks">
              
                 <div id="dropdown">
                    <button id="dropbtn"><button id="input-button">ACCOUNT</button>
                    <i className="fa fa-caret-down"></i>
                    </button>
                    <div id="dropdown-content">
                    <a href="/profile">Profile</a>
                    <a onClick={signOut}>Sign Out</a>
                    </div>
                </div>
                <a href="profile/createevent"><button id="input-button">CREATE EVENT</button></a>
                
                <a href="/welcome"><button id="input-button">ABOUT US</button></a>
                </div>
                </div>
            )
            }
}


HeaderComponent.contextType = UserContext;

export default HeaderComponent;