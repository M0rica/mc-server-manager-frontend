import React, {useEffect, useState} from "react";
import {default_ip} from "../../utils/globals";
import {ServerData} from "../../utils/types";
import Server from "../ServerElement/ServerComponent";
import {Link} from "react-router-dom";

function Home() {
    const [servers, set_servers] = useState({})

    const update_servers = () => {
        const ip = default_ip + "/api/servers"
        fetch(ip)
            .then(response => response.json())
            .then((server_list: { data: { [key: string]: ServerData } }) => {
                    set_servers(server_list.data)
                }
            )
    }

    useEffect(() => {
        update_servers()
        const interval = setInterval(() => {
            update_servers()
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return <div>
        <h2>Server List</h2>
        {
            Object.keys(servers).length > 0
                // Show server list if serves exist
                ? Object.keys(servers).map((key) => {
                        // @ts-ignore
                        return <Server server={servers[key]} key={key}/>
                    }
                )
                : <div>
                    <p>You have no servers</p>
                    <Link to="/create">Create Server</Link>
                </div>
        }

    </div>
}

export default Home
