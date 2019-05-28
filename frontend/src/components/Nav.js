import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { openModal } from '../actions/modal';

class Nav extends Component{
    openNewPost(){
        this.props.openModal();
    }

    render(){
        return (
            <header className="navbar navbar-expand flex-column flex-md-row bd-navbar bg-light">
                <Link
                    to="/"
                    className="navbar-brand">
                    Readable
                </Link>
                <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                    <li className="nav-item">
                        <button 
                            className="btn btn-sm text-primary"
                            onClick={() => this.openNewPost()}>
                            New
                        </button>
                    </li>
                </ul>
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: () => dispatch(openModal())
    }
}

export default connect(null, mapDispatchToProps)(Nav);