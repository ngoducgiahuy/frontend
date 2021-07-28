import React, { Component } from 'react'
import './Cart.css'
import Cookies from 'js-cookie';
import CartDetailSection from './CartDetailSection';
import { isLoggedIn } from '../../utils/Authentication'
import { Redirect } from 'react-router';

export default class CartIndex extends Component {
    createTable() {
        if (isLoggedIn() === false) {
            alert("Please login to view cart");
            return (
                <Redirect to='/' />
            );
        };
        if (Cookies.get('orderDetails') === undefined) {
            return <div className="no-product-img">
                <img src="/empty-cart.png"></img>
            </div>
        }
        return <CartDetailSection />
    }

    render() {
        return (
            <div>
                {this.createTable()}
            </div>
        )
    }
}
