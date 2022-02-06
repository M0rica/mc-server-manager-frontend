import React, {useEffect, useState} from 'react';
import './App.css';
import "./Navbar.css"
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";

import CreateServer from "./CreateServer/CreateServer";
import Home from "./Home/home";
import Settings from "./settings";
import ServerTabs from "./ServerSettings/ServerInfo";
import Icon from "@mdi/react";
import {mdiCog, mdiPlus, mdiViewList} from "@mdi/js";
import {default_ip} from "../utils/globals";


const Layout = () => {
    const [active, set_active] = useState(0)

    return <div>
        <nav className="navbar">
            <ul>
                <li>
                    <Link className={active === 0 ? "active" : ""} onClick={() => set_active(0)} to="/">
                        <Icon path={mdiViewList} className="icon"/>
                        Home
                    </Link>
                </li>
                <li>
                    <Link className={active === 1 ? "active" : ""} onClick={() => set_active(1)} to="/create">
                        <Icon path={mdiPlus} className="icon"/>
                        Create
                    </Link>
                </li>
                <li>
                    <Link className={active === 2 ? "active" : ""} to="/settings" onClick={() => set_active(2)}>
                        <Icon path={mdiCog} className="icon"/>
                        Settings
                    </Link>
                </li>
            </ul>
        </nav>

        <Outlet/>

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
                        <Route path="settings/:server_id" element={<ServerTabs/>}/>
                        <Route path="*" element={<h1>404</h1>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
