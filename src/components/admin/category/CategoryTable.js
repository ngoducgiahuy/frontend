import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { get, deleteAuth } from '../../utils/httpHelper'
import Pagination from '../../homepage/pagination/Pagination';
import EditCategory from './EditCategory';



export default class CategoryTable extends Component {
    state = {
        listCategories: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 9,
        responseError: "",
    };

    getCateList() {
        const uriCall = "/categories/";
        get(uriCall)
            .then(response => {
                const listCategories = response.data;
                this.setState({ listCategories });
                this.setState({ loading: false });
                console.log(listCategories);
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.getCateList();
    }

    // deleteCate(cateId) {
    //     console.log(cateId);
    // }



    deleteCate = (cateId, cateName) => {
        if (window.confirm('Delete category ' + cateName + '?')) {
            var uriCall = "/categories/" + cateId;
            // console.log("Hi");
            deleteAuth(uriCall).then((response) => {
                if (response.status === 200) {
                    console.log("Success");
                    alert("Delete success!");
                    this.setState({responseError: ""});
                    window.location.reload();
                }
            }).catch((error) => {
                console.log("Fail");
                console.log(error.response.data.message);
                var responseError = error.response.data.message;
                this.setState({responseError});
            })
        }
        else {
        }
    }

    render() {
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });
        const listCate = this.state.listCategories;
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = listCate.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th className="action-column">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(cate =>
                            <tr key={cate.id}>
                                <th scope="row">{cate.id}</th>
                                <td>{cate.name}</td>
                                <td>{cate.description}</td>
                                <td className="action-column">
                                    <EditCategory categoryId={cate.id} categoryName={cate.name} categoryDes={cate.description}
                                        buttonLabel="Update" />
                                    <Button className="margin-left" color="danger" onClick={() => this.deleteCate(cate.id, cate.name)}>
                                        <DeleteIcon fontSize="small" /> Delete
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div>
                    <Pagination postsPerPage={this.state.postsPerPage}
                        totalPost={listCate.length}
                        paginate={paginate} />
                </div>
            </div>
        )
    }
}
