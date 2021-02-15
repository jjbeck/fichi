import React from 'react';
import  './navbar.css'

export default class NavBarComponent extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="header">
            <div><span>Logo</span></div>
            <ul className="nav-links">
                <li className="nav-link-item">About us</li>
                <li className="nav-link-item">Calendar</li>
            </ul>
            <div className="">
                <span className="avatar">MT</span>
            </div>
        </div>
        )
    }
};