import React, { Component } from 'react'
import HomeComponent from '../../homepage/Homepage';
import { withRouter } from 'react-router';
import { get } from '../../../utils/httpHelper';

class ProductByCate extends Component {
    state = {
        cateId: this.props.match.params.cateId,
        cateName: "",
    }

    componentDidMount() {
        this.getProductList();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.cateId !== this.props.match.params.cateId) {
            this.getProductList();
        }
    }

    getProductList() {
        this.setState({ cateId: this.props.match.params.cateId });
        var uriCall = "/categories/" + this.props.match.params.cateId;
        get(uriCall)
            .then(response => {
                const cate = response.data;
                this.setState({ cateName: cate.name });
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <HomeComponent
                    uriCall={`/categories/${this.state.cateId}/products`}
                    listTitle={`Products of ${this.state.cateName}`} />
            </div>
        )
    }
}

export default withRouter(ProductByCate);
