import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import SSO from './services/sso.factory.js';
import toastify from './components/toast/toast.js';
import ToastContainerCustom from './components/toast/toastcontainer.jsx';
import Contents from './Contents.jsx';
import HeaderComponent from './components/header/header.component.jsx';
import { withRouter } from 'react-router-dom';

import UserContext from './UserContext'
import SideBar from './components/sidebar/sidebar.js';

import './global.css';

const apiEndpoint = process.env.REACT_APP_UI_AUTH_ENDPOINT;
const ssoSign = new SSO(apiEndpoint);



function Page() {
    const [ user, setUser ] = useState({ signedIn: false, userId: '', email: '', name: '' });
    

    useEffect(() => {
      console.log(user);
      async function fetchSignIn() {
        const response = await ssoSign.loadData();
        if (response) {
          toastify(response, 'error');
        } else {
          console.log(ssoSign);
          setUser({ signedIn: ssoSign.signedIn, userId: ssoSign.id, email: ssoSign.email })
          
        }
        
      }
      fetchSignIn()
      },[])
      

      return (
      
        <div>

          <UserContext.Provider value={{user, setUser}}>
        
            <HeaderComponent  />
            
          </UserContext.Provider>
          
         
          <UserContext.Provider value={{ user, setUser }}>
            <Contents  onUserChange={setUser}/>
          </UserContext.Provider>
          <ToastContainerCustom />
        </div>
      );

  }

  export default withRouter(Page);



  

 


