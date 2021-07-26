import React, { Component } from 'react'
import Sidebar from './sidebar/Sidebar';
import { isLoggedIn, compareRole } from '../utils/Authentication';
import { Redirect } from 'react-router';

export default class index extends Component {
    render() {
        if(isLoggedIn()==false||compareRole("ROLE_ADMIN")==false){
            alert("You don't have right permission");
            return (
                <Redirect to='/' />
            );
        };
        return (
            <div className="admin-sidebar">
                <Sidebar />
            </div>
        )
    }
}
