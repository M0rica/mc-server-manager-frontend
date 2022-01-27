import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import CreateServer from "./components/CreateServer/CreateServer";
import Home from "./components/Home/home";
import Settings from "./components/settings";
import Layout from "./components/Layout/Layout"
import ServerSettings from "./components/ServerSettings/ServerSettings";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="create" element={<CreateServer/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="settings/:server_name" element={<ServerSettings/>}/>
                        <Route path="*" element={<h1>404</h1>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
