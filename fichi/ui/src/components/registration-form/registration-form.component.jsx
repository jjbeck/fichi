import React, { useContext, useImperativeHandle } from "react";
import { useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LinkContainer } from 'react-router-bootstrap';
import './registration-form.css'
import ToastContainerCustom from '../toast/toastcontainer.jsx';
import {gql, useMutation } from '@apollo/client'
import { useHistory } from "react-router-dom";

import UserContext from '../../UserContext'
import Cookies from 'universal-cookie';
import { validateEmail, validatePassword } from '../../utils/validators';

const cookies = new Cookies();



const LOGIN = gql`
mutation
  login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
}`;

const CREATEUSER = gql`
mutation 
  signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
}`;

function RegistrationFormContainer(props,context) {
  const {user, setUser} = useContext(UserContext);
  let history = useHistory();
  
  
  const [values, setValues] = useState({
    email: '', password: ''
  });

  const [emailValid, setEmail] = useState({emailValid: true})
  const [passwordValid, setPassword] = useState({passwordValid: true})

  const [secretEmailValid, setSecretEmail] = useState({secretEmailValid: true})
  const [secretPasswordValid, setSecretPassword] = useState({secretPasswordValid: true})
  

 
  const [loginUser, { data: loginData }] = useMutation(LOGIN);
  const [createUser, { data }] = useMutation(CREATEUSER);
 

  const set = name => {
    return ({ target: { value }}) => {
      setValues(oldValues => ({...oldValues, [name]: value}))
      const emailValid = validateEmail(values.email);
    if (emailValid.isValid === false) {
      setSecretEmail({ secretEmailValid: false });
    } else {
      setSecretEmail({ secretEmailValid: true });
    }
    const passwordValid = validatePassword(values.password);
    
    if (passwordValid.isValid === false) {
      setSecretPassword({ secretPasswordValid: false });
    } else {
      setSecretPassword({ secretPasswordValid: true });
    }
    }
  }

  const OnSignUp = async (e) => {
    e.preventDefault();
    
    try {
    const result = await createUser({ variables: {email: values.email, password: values.password}})
    cookies.set('token', result.data.signup.token)
    setUser({signedIn: true})
    setValues({email: '', password: ''})
    history.push('/explore');
    } catch (e) {
      console.log(e);
    }
  }

  const Login = async (e) => {
    e.preventDefault();

    try { 
    const loginResult = await loginUser({ variables: {email: values.email, password: values.password}})
    console.log(loginResult);
    cookies.set('token', loginResult.data.login.token)
    setUser({signedIn: true})
    setValues({email: '', password: ''})
    history.push('/explore');
    } catch (e) {
      console.log(e);
    }
  }

  const emailValidation = () => {
    const emailValid = validateEmail(values.email);
    if (emailValid.isValid === false) {
      setEmail({ emailValid: false });
    } else {
      setEmail({ emailValid: true });
    }
  }

  const passwordValidation = () => {
    const passwordValid = validatePassword(values.password);
    console.log(passwordValid);
    if (passwordValid.isValid === false) {
      setPassword({ passwordValid: false });
    } else {
      setPassword({ passwordValid: true });
    }
  }

    
  


 
  
    if (user.signedIn === true) {
      return (
        <div className="email-wrapper">
            <div className="email-top">
              <h1 className="header-text">Where creators and people come to get fit together.</h1>
             
              
              <hr className="email-line"/>
            </div>
            <div className="email-bottom">
            
               <div >
              <LinkContainer exact to="/explore"><button  id="input-button" name="calendar-link" >EXPLORE WORKOUTS</button></LinkContainer>
             
              </div>
            </div>
            <ToastContainerCustom />
          </div>

      )
    } else {
      return (
        <div className="email-wrapper">
            <div className="email-top">
              <h1 className="header-text">Where creators and people come to get fit together.</h1>
              <div className="input-wrapper">
                  <h2 className="sub-header-text">Fichi is launching soon. Enter your email to recieve an invitation.</h2>
                </div>
              <form >
                <div className="input-wrapper">
                  <input onBlur={emailValidation} value={values.email} onChange={set('email')} className="email-input" type="text" placeholder="Enter email"></input>
                </div>
                <div className={emailValid.emailValid?"input-warning-hide":"input-warning"}>
                  <h5>Please enter valid email.</h5>
                </div>
                <div className="input-wrapper">
                  <input onBlur={passwordValidation} value={values.password} onChange={set('password')} className="password-input" type="text" placeholder="Enter password"></input>
                </div>
                <div className={passwordValid.passwordValid?"input-warning-hide":"input-warning"}>
                  <h5>Password must contain a minimum eight characters, at least one letter, one number and one special character:</h5>
                </div>
                <hr className="email-line"/>
                <div className="input-wrapper">
                  <button disabled={!secretEmailValid.secretEmailValid|| !secretPasswordValid.secretPasswordValid} onClick={OnSignUp} className="input-button1" id="input-button" type="submit">SIGN UP</button>
                  <button disabled={!secretEmailValid.secretEmailValid|| !secretPasswordValid.secretPasswordValid} onClick={Login} classname="input-button2" id="input-button" type="submit">SIGN IN</button>
                </div>
                
              </form>
              
            </div>
            <div className="email-bottom">
            </div>
            <ToastContainerCustom />
          </div>
      )
     
      
    }
  };


RegistrationFormContainer.contextType = UserContext;
export default RegistrationFormContainer;



/* Login workflow
1. On succes login, return access token
2. end acces token to backend to authenticate with google or facebook
3. on success return JWT token (make expired one once finished) and store as cookie and create user account
*/

//To do: double check that any error returned immediately logs out user
//write comments
//make toast to give user info