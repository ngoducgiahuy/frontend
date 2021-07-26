import React, { Component } from 'react'
import Star from './Star'
import './Rating.css'
import { get } from '../../../../utils/httpHelper'
import Pagination from '../../../pagination/Pagination'

export default class RatingList extends Component {
    state = {
        listRating: [],
        loading: false,
        currentPage: 1,
        ratingsPerPage: 3,
    }

    getRatingList() {
        const uriCall = '/ratings/search?productId=' + this.props.productId
        get(uriCall).then(response => {
            const listRating = response.data;
            this.setState({ listRating });
            console.log(this.state.listRating);
        }).catch((error) => console.log(error));
    }

    componentDidMount() {
        this.getRatingList();
    }

    render() {
        const { listRating } = this.state;
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });
        const indexOfLastRating = this.state.currentPage * this.state.ratingsPerPage;
        const indexOfFirstRating = indexOfLastRating - this.state.ratingsPerPage;
        const currentRatings = listRating.slice(indexOfFirstRating, indexOfLastRating);
        return (
            <div className="rating-section-margin">
                {
                    currentRatings.map(rating => (
                        <div key={rating.customerId}>
                            <div className="individual-rating">
                                <div className="div-user-inline">
                                    <h6>{rating.customerUserName} </h6>
                                    <Star ratingPoint={rating.ratingPoint} />
                                </div>
                                <div className="rating-date"> {rating.ratingDate}</div>
                                <div>
                                    {rating.comment}
                                </div>

                            </div>
                            <hr className="hr-rating" />
                        </div>
                    ))
                }
                <Pagination postsPerPage={this.state.ratingsPerPage}
                    totalPost={listRating.length}
                    paginate={paginate} />
            </div>
        )
    }
}
