import React, { Component } from 'react'
import HomeComponent from '../../homepage/Homepage';

export default class AllProduct extends Component {
    render() {
        return (
            <div>
                <HomeComponent uriCall="/products" listTitle="All products" />
            </div>
        )
    }
}
