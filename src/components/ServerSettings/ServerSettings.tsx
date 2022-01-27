import {Link, useParams} from "react-router-dom";

import "./ServerSettings.css"

function ServerSettings() {
    const {server_name} = useParams()
    console.log(server_name)

    return <>
        <span><Link to={"/"}>Back</Link> <h2>Server Settings</h2></span>

        <p>{server_name}</p>

    </>
}

export default ServerSettings
