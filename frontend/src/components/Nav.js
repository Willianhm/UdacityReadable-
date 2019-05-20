import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <header className="navbar navbar-expand flex-column flex-md-row bd-navbar bg-light">
        <Link
            to="/"
            className="navbar-brand">
            Readable
        </Link>
        <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            <li className="nav-item">
                <Link to="/new">New</Link>
            </li>
        </ul>
    </header>
);