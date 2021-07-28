import React, { Component } from 'react'
import './User.css'
import UserTable from './UserTable'


export default class UserDashboard extends Component {
    render() {
        return (
            <div className="user">
                <div className="user-dashboard allSides">
                    <h2>User</h2>
                    <hr style={{ marginTop: 0 }}></hr>
                    <UserTable />
                </div>
                
            </div>
        )
    }
}