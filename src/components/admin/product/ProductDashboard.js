import React, { Component } from 'react'
import './Product.css'
import ProductTale from './ProductTable';
import CreateProduct from './CreateProduct';


export default class CategoryDashboard extends Component {
    render() {
        return (
            <div className="product">
                <div className="product-dashboard allSides">
                    <h2>Product</h2>
                    <hr style={{ marginTop: 0 }}></hr>
                    <CreateProduct buttonLabel="Create Product"/>
                    <ProductTale />
                </div>
                
            </div>
        )
    }
}
