import Cookies from 'js-cookie';
import React, { Component } from 'react'
import Navbar from './navbar/NavbarHeader';

export default class Header extends Component {
    state = {
        username: "Account",
        isLoggedIn: false,
    }

    componentDidMount() {
        if (Cookies.get('username') === null || Cookies.get('username') === undefined) {
            const username = "Account";
            this.setState({ username });
            this.setState({ isLoggedIn: false });

        } else {
            const username = Cookies.get('username');
            this.setState({ username });
            this.setState({ isLoggedIn: true });
        }
        console.log(Cookies.get('username'));
    }

    render() {
        return (
            <div>
                <Navbar username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>
            </div>
        )
    }
}
