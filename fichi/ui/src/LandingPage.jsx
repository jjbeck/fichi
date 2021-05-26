import React, { useContext } from 'react';
import { useHistory } from "react-router-dom"

import IntroContainer from './containers/intro/intro.container.jsx';
import InfoContainer from './containers/info/info.container.jsx';
import FooterContainer from './containers/footer/footer.container.jsx';
import SignupContainer from './containers/signup/signup.container.jsx';
import './global.css';
import { withRouter } from 'react-router-dom';
import SideBar from './components/sidebar/sidebar.js';


import UserContext from './UserContext';







function LandingPage(props) {
    const { user } = useContext(UserContext)
    let history = useHistory();
    
    if (history.location.pathname !== "/welcome" && user.signedIn) history.push("/explore");


  
    return (
      <>
      <div className="page">
      <div className="sidebar-fixed">
      <div className="sidebar">
        <SideBar />
      </div>
      </div>
      <div className="contents">
        <IntroContainer onUserChange={props.onUserChange} />
        <InfoContainer/>
        <SignupContainer/>
        <FooterContainer />
      </div>
      </div>
        
      </>
    )
  
}


export default LandingPage;