import React, {useState} from "react";
import Server, {server_props} from "../ServerElement/ServerComponent";


function get_servers(): server_props[]{
    // return sth with fetch
    const gommehd: server_props = {
        name: "gomme",
        ip_address: "gommehd.net",
        image_url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fminecraft-server-icon-2.png&f=1&nofb=1",
    }
    const hypixel: server_props = {
        name: "hypixel",
        ip_address: "mc.hypixel.net",
        image_url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpm1.narvii.com%2F6484%2Fcd5f637c173e7766d7fde16145b07a0913a7d0e4_hq.jpg&f=1&nofb=1",
    }
    return [
        gommehd, hypixel
    ]
}

function Home() {
    const [servers, set_servers] = useState(get_servers())

    const [server_props, set_server_props] = useState()

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
