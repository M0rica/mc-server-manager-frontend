import React, {useState} from 'react';
import './App.css';
import "./Navbar.css"
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";

import CreateServer from "./CreateServer/CreateServer";
import Home from "./Home/home";
import Settings from "./settings";
import ServerTabs from "./ServerSettings/ServerInfo";
import Icon from "@mdi/react";
import {mdiViewList, mdiPlus, mdiCog} from "@mdi/js";


const Layout = () => {
    const [active, set_active] = useState(0)

    return <div>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link className={active === 0 ? "active" : ""} onClick={()=>set_active(0)} to="/">
                           <Icon path={mdiViewList} className="icon"/> <text>Home</text></Link>
        </li>
                    <li>
                        <Link className={active === 1 ? "active" : ""} onClick={()=>set_active(1)} to="/create">
                            <Icon path={mdiPlus} className="icon"/> <text>Create</text>
                        </Link>
                    </li>
                    <li>
                        <Link className={active === 2 ? "active" : ""} to="/settings" onClick={()=>set_active(2)}>
                            <Icon path={mdiCog} className="icon"/> <text>Settings</text></Link>
                    </li>
                </ul>
            </nav>

            <Outlet />

            <h1>Footer</h1>
        </div>
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
                        <Route path="settings/:server_name" element={<ServerTabs/>}/>
                        <Route path="*" element={<h1>404</h1>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
