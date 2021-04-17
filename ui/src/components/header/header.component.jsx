import React from 'react';
import { Link } from 'react-router-dom'
import  './header.css'

export default class HeaderComponent extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="navbar">
            <div><span>Logo</span></div>
            <div className="nav-links">
            <Link className="nav-link-item" to="/calendar">Calendar</Link>
            <Link className="nav-link-item" to="/welcome">About Us</Link>
            <Link className="nav-link-item" to="/welcome">Profile</Link>
           </div>
            
        </div>
        )
    }
};