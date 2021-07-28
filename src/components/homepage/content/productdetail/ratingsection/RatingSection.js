import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import UserRating from './UserRating';
import './Rating.css'
import RatingList from './RatingList';
import Cookies from 'js-cookie';

export default class RatingSection extends Component {
    state = {
        isOpen: false,
        isLoggedIn: false
    }
    componentDidMount(){
        this.checkLogin();
    }
    checkLogin = () => {
        if (Cookies.get('username') === null || Cookies.get('username') === undefined) {
            this.setState({ isLoggedIn: false }); 
        } else {
            this.setState({ isLoggedIn: true });
        }
    }
    render() {
        const toggle = () => {
            if (this.state.isLoggedIn === false) {
                alert("You must log in to give rating!");
            } else {
                var isOpen = !this.state.isOpen;
                this.setState({ isOpen });
            }
        };
        
        return (

            <div>
                <h4 className="rating-section-margin">User Ratings Section <Button className="btn-rating" color="primary" onClick={toggle}>Give your rating</Button></h4>
                <Collapse isOpen={this.state.isOpen}>
                    <Card>
                        <CardBody>
                            <UserRating productId={this.props.productId} />
                        </CardBody>
                    </Card>
                </Collapse>
                <RatingList productId={this.props.productId} />
            </div>
        )
    }
}
