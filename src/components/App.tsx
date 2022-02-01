import React from 'react';
import './App.css';
import "./Navbar.css"
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";

import CreateServer from "./CreateServer/CreateServer";
import Home from "./Home/home";
import Settings from "./settings";
import ServerInfo from "./ServerSettings/ServerInfo";


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

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="create" element={<CreateServer/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="settings/:server_name" element={<ServerInfo/>}/>
                        <Route path="*" element={<h1>404</h1>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
