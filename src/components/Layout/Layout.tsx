import {Link, Outlet} from "react-router-dom";
import React from "react";
import "./Layout.css"


const Layout = () => {
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />

            <h1>Footer</h1>
        </div>
    )
};

export default Layout
