import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
} from 'reactstrap';
import { get } from '../../../utils/httpHelper';
import './navbar.css';
import Login from '../../auth/Login'
import Register from '../../auth/register//Register';
import Cookies from 'js-cookie';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { getCartTotalNumberItem } from '../../cart/CartFunction'

export default class NavbarHeader extends Component {
    state = {
        isOpen: false,
        isCartOpen: false,
        isUserOpen: false,
        cartNumberItem: getCartTotalNumberItem(),
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
                if (Cookies.get('orderDetails') !== undefined) {
                    Cookies.remove('orderDetails');
                }
                alert("Logout success");
                window.location.reload();
            } else {

            }

        }
        const listCate = this.state.listCate;
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
                                    {this.props.isAdminOrStaff &&
                                        <DropdownItem>
                                            <a style={{textDecoration:"none", color:"black"}} href="/admin">Manage Page</a>
                                        </DropdownItem>}
                                    {this.props.isLoggedIn &&
                                        <DropdownItem>
                                            <a onClick={LogoutFunction}>Logout</a>
                                        </DropdownItem>
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="/cart/">
                                    <Badge badgeContent={this.state.cartNumberItem} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}
