import {
    mdiNetworkStrengthOffOutline,
    mdiNetworkStrength4, mdiLoading
} from "@mdi/js"
import {useNavigate} from "react-router-dom";
import {Icon} from "@mdi/react";

import "./ServerComponent.css"
import {ServerData} from "../../utils/types";
import {default_ip} from "../../utils/globals";

function Server(props: { server: ServerData }) {

    let nav = useNavigate()

    return <div className="server_element" onClick={() => nav(`/server/${props.server.id}`)}>

        <div className="img">
            <img className="server_img" src={props.server.name} alt="Cannot display image"/>
        </div>

            <div className="server-content">
                <h3>{props.server.name}</h3>
            </div>
        <div className="right">
            {
                props.server.online_stats.players == undefined
                    ? <p>Offline</p>
                    : <p>{props.server.online_stats.players + "props.server.server_properties.slots"}</p>
            }

                <Icon className={"indicator_icon"} path={(() => {
                    switch (props.server.status.toString()) {
                        case "stopped":
                            return mdiNetworkStrengthOffOutline
                        case "running":
                            return mdiNetworkStrength4
                        case "installing":
                            return mdiLoading
                        default:
                            return mdiNetworkStrengthOffOutline
                    }
                })()} size={"16px"}/>

        </div>

        <p>{default_ip.split(":").slice(0, -1).join(":") + ":" + props.server.network_config.port}</p>

    </div>
}

export default Server
