import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { get } from '../../../utils/httpHelper';
import './navbar.css';
import Login from '../../auth/Login'
import Register from '../../auth/register//Register';
import Cookies from 'js-cookie';

export default class NavbarHeader extends Component {
    state = {
        isOpen: false,
        isCartOpen: false,
        isUserOpen: false,
        listCate: [],
    };

    componentDidMount() {
        get("/categories")
            .then(response => {
                const listCate = response.data.slice(0, 5);
                this.setState({ listCate });
            })
            .catch((error) => console.log(error));

    }
    toggle = () => { this.setState({ isOpen: true }) };
    toggleCart = () => { this.setState({ isCartOpen: true }) };
    toggleUser = () => { this.setState({ isUserOpen: true }) };
    render() {
        function LogoutFunction() {
            if (window.confirm('You want to log out?')) {
                Cookies.remove('token');
                Cookies.remove('username');
                Cookies.remove('email');
                Cookies.remove('id');
                Cookies.remove('roles');
                alert("Logout success");
                window.location.reload();
            } else {

            }

        }
        const listCate = this.state.listCate;
        let buttonLoggin = null;
        let buttonLogout = null;
        let buttonRegister = null;
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">HuyShop</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Category
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {listCate.map(cate =>
                                        <DropdownItem key={cate.id}>
                                            <Link className="link-css" to={`/cate/${cate.id}`} >{cate.name}</Link>
                                        </DropdownItem>
                                    )}
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link className="link-css" to="/products">All Product</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <NavbarToggler onClick={this.toggleCart} />
                    <Collapse className="flex-reverse" isOpen={this.state.isCartOpen} navbar>
                        <Nav navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {!this.props.isLoggedIn && <DropdownItem> <Login buttonLabel="Login" /> </DropdownItem>}
                                    {!this.props.isLoggedIn && <DropdownItem> <Register buttonLabel="Register" /> </DropdownItem>}
                                    {/* {this.props.isLoggedIn &&
                                        <DropdownItem divider />
                                    } */}
                                    {this.props.isLoggedIn &&
                                        <DropdownItem>
                                            <a onClick={LogoutFunction}>Logout</a>
                                        </DropdownItem>
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="/cart/">Cart</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}
