import React from "react";
import {mdiAccessPoint, mdiAccessPointOff} from "@mdi/js"
import {Link} from "react-router-dom";
import {Icon} from "@mdi/react";


export interface server_props {
    ip_address: string
    name: string
    running: boolean
    settings?: any
}

interface server_required_props {
    server: server_props
}

function Server(props: server_required_props) {
    return <div className="border">
            <span>
                {
                    props.server.running
                        ? <Icon path={mdiAccessPoint} color="green" className="icon"/>
                        : <Icon path={mdiAccessPointOff} color="red" className="icon"/>
                }
            </span>
        <span>{props.server.name}</span>
        
        <Link to={`settings/${props.server.name}`}>Settings</Link>
        <p>{props.server.ip_address}</p>


    </div>
}

export default Server
