import {
    mdiNetworkStrengthOffOutline,
    mdiNetworkStrength2,
    mdiNetworkStrength4
} from "@mdi/js"
import {useNavigate} from "react-router-dom";
import {Icon} from "@mdi/react";

import "./ServerComponent.css"

export interface server_props {
    ip_address: string
    name: string
    settings?: any
    image_url?: string
    motd?: string
}

export interface server_status {
    slots: number
    players: number
    status: number
}

interface server_required_props {
    server: server_props
}

function Server(props: server_required_props) {

    let status: server_status = {
        slots: 10, players: 3, status: 2
    }
    let nav = useNavigate()

    return <div className="server_element" onClick={() => nav(`/settings/${props.server.name}`)}>

        <div className="img">
            <img className="server_img" src={props.server.image_url} alt="Cannot display image"/>
        </div>

            <div className="server-content">
                <h3>{props.server.name}</h3>
            </div>
        <div className="right">
                <Icon className={"indicator_icon"} path={(() => {
                    switch (status.status) {
                        case 0:
                            return mdiNetworkStrengthOffOutline
                        case 1:
                            return mdiNetworkStrength2
                        case 2:
                            return mdiNetworkStrength4
                        default:
                            return mdiNetworkStrengthOffOutline
                    }
                })()} size={"16px"}/>

        </div>


        <p>{props.server.ip_address}</p>


    </div>
}

export default Server
