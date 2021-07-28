import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Sidebar extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem>Category</ListGroupItem>
                    <ListGroupItem>Hot product</ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
