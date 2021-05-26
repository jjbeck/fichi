import { Link } from 'react-router-dom'
import React from 'react';
import { useState } from 'react';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './sidebar.css'

function SideBar() {

    const [sideBar, setSideBar] = useState(true);
    
    const showSideBar = () => setSideBar(!sideBar);
    
    return(
        
        <>
        <div id="navigation">
            <Link to='#' className="menu-bars">
                <FontAwesomeIcon onClick={showSideBar} icon={sideBar ? faArrowLeft: faArrowRight} />
            </Link>
       
            <div className={sideBar? "nav-menu active" : "nav-menu notActive"}>
            <ul className="nav-menu-items">
                <li>
                    <Link to="/welcome">
                        <span className="icon"><FontAwesomeIcon icon={faHome} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/explore">
                        <span className="icon"><FontAwesomeIcon icon={faBinoculars} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Explore</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <span className="icon"><FontAwesomeIcon icon={faUserFriends} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Subscriptions</span>
                    </Link>
                </li>

                <hr className="nav-line"/>
                <li>
                    <Link to="/profile">
                        <span className="icon"><FontAwesomeIcon icon={faHeart} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Your Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <span className="icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Calendar</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <span className="icon"><FontAwesomeIcon icon={faHistory} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>History</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <span className="icon"><FontAwesomeIcon icon={faThumbsUp} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Liked Events</span>
                    </Link>
                </li>
                
                <hr className="nav-line"/>
                <li>
                    <Link to="/account">
                        <span className="icon"><FontAwesomeIcon icon={faCog} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Your Account</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        <span className="icon"><FontAwesomeIcon icon={faEnvelopeSquare} /></span>
                        <span className={sideBar ? "title" : "noTitle"}>Contact Us</span>
                    </Link>
                </li>
            </ul>
            </div>
            </div>
       
        </>
    )
}

export default SideBar;