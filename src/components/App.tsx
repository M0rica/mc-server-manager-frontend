import React, {useEffect, useState} from 'react';
import './App.css';
import "./Navbar.css"
import {BrowserRouter, Link, Outlet, Route, Routes, useLocation} from "react-router-dom";

import CreateServer from "./CreateServer/CreateServer";
import Home from "./Home/home";
import Settings from "./settings";
import ServerTabs from "./Settings/ServerInfo";
import Icon from "@mdi/react";
import {mdiCog, mdiPlus, mdiViewList} from "@mdi/js";
import {default_ip} from "../utils/globals";


const Layout = () => {
    const location = useLocation().pathname

    return <div>
        <nav className="navbar">
            <ul>
                <li>
                    <Link className={location === "/" ? "active" : ""} to="/">
                        <Icon path={mdiViewList} className="icon"/>
                        Home
                    </Link>
                </li>
                <li>
                    <Link className={location === "/create" ? "active" : ""} to="/create">
                        <Icon path={mdiPlus} className="icon"/>
                        Create
                    </Link>
                </li>
                <li>
                    <Link className={location === "/settings" ? "active" : ""} to="/settings">
                        <Icon path={mdiCog} className="icon"/>
                        Settings
                    </Link>
                </li>
            </ul>
        </nav>
        <div className="content">
            <Outlet/>
        </div>
        <h1>Footer</h1>
    </div>
};

function App() {
    const [versions, set_versions] = useState(["latest"])
    useEffect(() => {
            const ip = default_ip + "/api/available_versions"
            console.log("Fetching")
            fetch(ip)
                .then(response => response.json())
                .then((vers: { versions: string[] }) => {
                    vers.versions.unshift("latest")
                    set_versions(vers.versions)
                })
        }, []
    )


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="create" element={<CreateServer versions={versions}/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="server/:server_id" element={<ServerTabs/>}/>
                        <Route path="*" element={<h1>404</h1>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
