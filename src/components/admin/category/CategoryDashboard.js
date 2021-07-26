import React, { Component } from 'react'
import './Category.css'
import CategoryTable from './CategoryTable'
import CreateCategory from './CreateCategory'


export default class CategoryDashboard extends Component {
    render() {
        return (
            <div className="cate">
                <div className="cate-dashboard allSides">
                    <h2>Category</h2>
                    <hr style={{ marginTop: 0 }}></hr>
                    <CreateCategory buttonLabel="Create Category"/>
                    <CategoryTable />
                </div>
                
            </div>
        )
    }
}
