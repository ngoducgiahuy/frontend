import Cookies from 'js-cookie';
import React, { Component } from 'react'
import Navbar from './navbar/NavbarHeader';
import { isLoggedIn, compareRole } from '../../utils/Authentication'

export default class Header extends Component {
    state = {
        username: "Account",
        isLoggedIn: false,
        isAdminOrStaff: false,
    }

    componentDidMount() {
        if (!isLoggedIn()) {
            const username = "Account";
            this.setState({ username });
            this.setState({ isLoggedIn: false });
        } else {
            const username = Cookies.get('username');
            this.setState({ username });
            this.setState({ isLoggedIn: true });
            if(compareRole("ROLE_STAFF")||compareRole("ROLE_ADMIN")) {
                this.setState({ isAdminOrStaff: true });
            } else {
                this.setState({ isAdminOrStaff: false });
            }
        }
    }

    render() {
        return (
            <div>
                <Navbar username={this.state.username} isLoggedIn={this.state.isLoggedIn} isAdminOrStaff={this.state.isAdminOrStaff}/>
            </div>
        )
    }
}
