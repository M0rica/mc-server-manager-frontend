import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import "./ServerSettings.css"
import SideTabElement, {ElementProps} from "../SideTabElement/SideTabElement"
import {useEffect, useState} from "react";
import {precisionRound} from "../../utils/helper_functions";
import {Icon} from "@mdi/react";
import {mdiRestart, mdiStop} from "@mdi/js";
import 'react-confirm-alert/src/react-confirm-alert.css'
import {useNavigate, useParams} from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import {default_ip} from "../../utils/globals";
import {loading_server_data, ServerData} from "../../utils/types";
import ServerSettings from "./ServerSettings";
import useWebSocket, {ReadyState} from "react-use-websocket";


interface SocketMessage {

    stdout: string
}

function PlayerListEntry(props: { name: string, on_action: any }) {

    return <li>
        <div className="player_entry">
            {props.name}
            <div>
                <button onClick={() => props.on_action(props.name, "ban")}>Ban</button>
                <button onClick={() => props.on_action(props.name, "kick")}>Kick</button>
                <button onClick={() => props.on_action(props.name, "op")}>Op</button>
            </div>
        </div>

    </li>
}

function ServerInfo(props: { server_data: ServerData }) {
    const init_dlg_data = {
        visible: false,
        text: "",
        buttons: [""],
        player: "",
        action: ""
    }
    const [dlg_data, set_dlg_data] = useState(init_dlg_data)
    const [server_updates, set_current_update] = useState<SocketMessage>({stdout: ""})

    const {
        lastJsonMessage,
        readyState
    } = useWebSocket(`ws://localhost:5000/api/servers/${props.server_data.id}/datastream`)

    useEffect(() => {
        if (lastJsonMessage != null) {
            set_current_update({stdout: server_updates.stdout + lastJsonMessage["stdout"]})
        }
    }, [lastJsonMessage])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const percentage = precisionRound(840 / props.server_data.hardware_config.ram * 100, 1)

    const kick_ban = (name: string, action: string) => {
        set_dlg_data(
            {
                visible: true,
                text: `Do you want to ${action} ${name}`,
                buttons: ["Yes", "No"],
                player: name,
                action: action
            }
        )
    }

    const do_action = (action: string, data?: {}) => {
        let payload;
        if (data == undefined)
            payload = {action: action}
        else {
            payload = {action: action, action_data: data}
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }

        fetch(`${default_ip}/api/servers/${props.server_data.id}/action`, requestOptions)
            .then(async response => {
                const is_json = response.headers.get("content-type")
                const data = is_json && await response.json()
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log(response)

            })
            .catch(error => alert(error));
    }

    const kick_ban_ready = (result: string) => {
        console.log(dlg_data, result)
        if (result == "No") {
            set_dlg_data(init_dlg_data)
            return
        }
        do_action(dlg_data.action, {player: dlg_data.player})
        set_dlg_data(init_dlg_data)
    }
    return <div className="main_content">
        <h2>Info</h2>
        <div className="layout"
             hidden={!(["running", "starting"].includes(props.server_data.status))}>
            <div className="server_info_content">
                <div className="infoindicators">
                    <div className="mem_info round_container">
                        <CircularProgressbar className="circleprogbar"
                                             value={percentage} text={percentage.toString() + "%"}/>
                        <div className="info_text">

                            Ram Usage
                            <br/>

                        </div>
                    </div>

                    <div className="cpu_info round_container">
                        <CircularProgressbar className="circleprogbar"
                                             value={0.2 * 100}
                                             text={(0.2 * 100).toString() + "%"}/>
                        <div className="info_text">

                            CPU Usage

                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={() => do_action("stop")}><Icon path={mdiStop} className="icon"/> Stop</button>
                    <button><Icon path={mdiRestart} className="icon"/> Restart</button>
                </div>

                <div className="console">
                    <textarea contentEditable={false} defaultValue={server_updates?.stdout}/>
                    <input type="text" placeholder="Type command"/>
                </div>
            </div>

            <div className="player_list">
                <h3>Player List</h3>
                <ul>
                    <PlayerListEntry name="NoobMaster3000" on_action={(name: string, action: string) => {
                        kick_ban(name, action)
                    }}/>
                </ul>

            </div>
        </div>

        <div className="layout" hidden={props.server_data.status != "stopped"}>
            Server is offline
            <button onClick={() => do_action("start")}>Start Server</button>
        </div>

        <div className="layout" hidden={props.server_data.status != "installing"}>
            Server gets installed
        </div>
        <Dialog options={dlg_data} result_ready={kick_ban_ready}/>

    </div>
}


function ServerTabs() {
    const {server_id} = useParams()
    const [server_data, set_server_data] = useState<ServerData>(loading_server_data)

    const nav = useNavigate()

    const update_servers = () => {
        const ip = `${default_ip}/api/servers/${server_id}`
        fetch(ip)
            .then(response => response.json())
            .then((server_list: { data: ServerData }) => {
                    if (server_list.data)
                        set_server_data(server_list.data)
                }
            ).catch((error) => {
            console.error(error)
            nav("/")
        })
    }

    useEffect(() => {
        update_servers()
        const interval = setInterval(() => {
            update_servers()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const elements: ElementProps[] = [
        {element: <ServerInfo server_data={server_data}/>, tab_text: "Info"},
        {element: <ServerSettings server_data={server_data.server_properties}/>, tab_text: "Settings"}
    ]

    return <SideTabElement elements={elements}/>
}

export default ServerTabs
