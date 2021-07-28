import React, { Component } from 'react'
import './Order.css'
import OrderTale from './OrderTable';


export default class CategoryDashboard extends Component {
    render() {
        return (
            <div className="order">
                <div className="order-dashboard allSides">
                    <h2>Order</h2>
                    <hr style={{ marginTop: 0 }}></hr>
                    <OrderTale />
                </div>
                
            </div>
        )
    }
}
