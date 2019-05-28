import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { changeOrder } from '../actions/order';

const orders = [
    { name: "Score", column: "voteScore" },
    { name: "Created Date", column: "timestamp" }
];

class NavActionButtons extends Component{
    changeOrder(order){
        this.props.changeOrder(order);
    }

    renderOrders(){
        const { currentOrder } = this.props;
        return orders.map(order => (
            <button
                className={`btn-sm dropdown-item ${currentOrder === order.column ? "active" : ""}`} 
                key={order.column}
                onClick={ () => this.changeOrder(order.column) }>
                {order.name}
            </button>
        ));
    }

    renderCategories(){
        const { categories } = this.props;
        const { category } = this.props.match.params;
        return categories.map(categorie => (
            <Link 
                key={categorie.path}
                to={`/${categorie.path}`}
                className={`dropdown-item ${categorie.path === category ? "active" : ""}`} >
                {categorie.name}
            </Link>
        ));
    }

    render(){
        return (
            <div className="text-right mt-1">
                <div className="d-inline-flex">
                    <div className="dropdown mr-1">
                        <div 
                            className="btn-sm dropdown-toggle text-primary" 
                            id="dropdownCategories" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                            Categories
                        </div>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownCategories">
                            {this.renderCategories()}
                        </div>
                    </div>
                    <div className="dropdown">
                        <div
                            className="btn-sm dropdown-toggle text-primary" 
                            id="dropdownOrder" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                            Order
                        </div>
                        <div 
                            className="dropdown-menu dropdown-menu-right" 
                            aria-labelledby="dropdownOrder">
                            {this.renderOrders()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ order, categories }){
    return {
        categories:     categories,
        currentOrder:   order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeOrder: (order) => dispatch(changeOrder(order))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavActionButtons));