import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import SideBar from '../sidebar/Sidebar';
import './homepage.css';
import ListProduct from '../listproduct/ListProduct';

export default class Homepage extends Component {

    render() {
        return (
            <div className="margin-top">
                <ListProduct uriCall={this.props.uriCall} listTitle={this.props.listTitle} />
            </div>
        )
    }
}
