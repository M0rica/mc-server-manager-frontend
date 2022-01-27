import React from "react";
import Server, {server_props} from "../ServerComponent";


function get_servers(): server_props[]{
    // return sth with fetch
    const gommehd: server_props = {
        name: "gomme",
        ip_address: "gommehd.net",
        running: true
    }
    const hypixel: server_props = {
        name: "hypixel",
        ip_address: "mc.hypixel.net",
        running: false
    }
    return [
        gommehd, hypixel
    ]
}


function Home() {
    const servers: server_props[] = get_servers()
    return <>
        <h2>Server List</h2>
        {
            servers.map((server) => {
                return <Server server={server} key={server.name}/>
            })
        }

    </>
}

export default Home
