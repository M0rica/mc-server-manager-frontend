import React, {useEffect, useState} from "react";
import {default_ip} from "../../utils/globals";
import {ServerData} from "../../utils/types";
import Server from "../ServerElement/ServerComponent";
import {Link} from "react-router-dom";
import {Icon} from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function Home() {
    const [servers, set_servers] = useState({})
    const [servers_loaded, set_servers_loaded] = useState(false)
    const [failed_requests, set_failed_requests] = useState(0)

    const update_servers = () => {
        const ip = default_ip + "/api/servers"
        fetch(ip)
            .then(response => response.json())
            .then((server_list: { data: { [key: string]: ServerData } }) => {
                    set_servers(server_list.data)
                    set_servers_loaded(true)
                }
            ).catch(() => set_failed_requests(failed_requests + 1))
    }

    useEffect(() => {
        update_servers()
        const interval = setInterval(() => {
            update_servers()
            console.log(failed_requests)
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const render_content = () => {
        if (servers_loaded && Object.keys(servers).length > 0) {
            return Object.keys(servers).map((key) => {
                    // @ts-ignore
                    return <Server server={servers[key]} key={key}/>
                }
            )
        } else if (servers_loaded) {
            return <div>
                <p>You have no servers</p>
                <Link to="/create">Create Server</Link>
            </div>
        } else if (failed_requests == 0) {
            return <Icon path={mdiLoading} spin={2} size={"50px"}/>
        } else {
            return <h3>Server Error</h3>
        }
    }

    return <div>
        <h2>Server List</h2>

        {
            render_content()
        }

    </div>
}

export default Home
