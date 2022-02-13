import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import "./ServerSettings.css"
import SideTabElement, {ElementProps} from "../SideTabElement/SideTabElement"
import {useEffect, useRef, useState} from "react";
import {precisionRound} from "../../utils/helper_functions";
import {Icon} from "@mdi/react";
import {mdiRestart, mdiStop} from "@mdi/js";
import 'react-confirm-alert/src/react-confirm-alert.css'
import {useNavigate, useParams} from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import {default_ip} from "../../utils/globals";
import {loading_server_data, ServerData} from "../../utils/types";
import ServerSettings from "./ServerSettings";

interface SocketMessage {

    "cpu": { "percent": number },
    "memory"?: { "total": number, "used": number, "server": number },
    full_log?: boolean

}

interface Player {
    "name": "Dummerle123"
    "is_online": boolean
    "is_op": boolean
    "is_banned": boolean
    "ban_reason": string
    "ban_since": string
}

interface PlayerList {
    online: Player[]
    banned: Player[]
    op: Player[]
}

function PlayerListEntry(props: { player: Player, on_action: any }) {

    type actions_map = {
        action: string
        text: string
    }

    let actions: actions_map[] = []
    actions.push(!props.player.is_banned ? {action: "ban", text: "Ban"} : {action: "pardon", text: "Pardon"})
    actions.push(!props.player.is_op ? {action: "op", text: "Op"} : {action: "deop", text: "Deop"})
    actions.push({action: "kick", text: "Kick"})

    return <li>
        <div className="player_entry">
            {props.player.name}
            <div>
                {
                    actions.map((action: actions_map) => {
                        return <button
                            onClick={() => props.on_action(props.player.name, action.action)}>{action.text}</button>
                    })
                }
            </div>
        </div>

    </li>
}


function ServerInfo(this: any, props: { server_data: ServerData, update_servers: Function }) {
    const init_dlg_data = {
        visible: false,
        text: "",
        buttons: [""],
        player: "",
        action: ""
    }
    const [dlg_data, set_dlg_data] = useState(init_dlg_data)
    const [server_updates, set_current_update] = useState<SocketMessage>()
    const [player_list, set_players] = useState<PlayerList>()

    const stdout = useRef("")
    const ws = useRef<WebSocket>()

    const scrollToBottom = () => {
        const text_area = document.getElementById("ta_console")
        if (text_area != null)
            text_area.scrollTop = text_area.scrollHeight
    }

    const update_players = () => {
        fetch(`${default_ip}/api/servers/${props.server_data.id}/players`)
            .then((resp) => resp.json())
            .then((data: PlayerList) => {
                set_players(data)
            })
    }

    useEffect(() => {
        update_players()
    }, [props.server_data.id])

    useEffect(() => {
        if (props.server_data.id == 0 || props.server_data.status == "stopped") {
            return
        }
        ws.current = new WebSocket(`ws://localhost:5000/api/servers/${props.server_data.id}/datastream`)

        ws.current.onmessage = (msg) => {
            const data = JSON.parse(msg.data)

            set_current_update({
                cpu: data.cpu, memory: data.memory
            })

            if (data.full_log) {
                stdout.current = ""
            }
            if (data.stdout != "") {
                stdout.current = stdout.current + data.stdout
                scrollToBottom()
            }
        }

        ws.current.onopen = () => {
            console.log("Websocket opened")
        }

        ws.current.onerror = (err) => {
            console.log(err)
        }

        ws.current.onclose = () => {
            console.log("Websocket closed")
        }
        return () => {
            ws.current?.close()
        }

    }, [props.server_data.id, props.server_data.status])

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
        if (action == "start") {
            set_current_update({
                cpu: {percent: 0},
                memory: {server: 0, total: 1, used: 0},
            })
            stdout.current = ""

        }
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

            })
            .catch(error => alert(error));
        setTimeout(() => {
                props.update_servers()
                update_players()
            }, 1000
        )

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
    let memory_percentage = 0
    if (server_updates?.memory != undefined) {
        memory_percentage = server_updates?.memory.server / server_updates?.memory.total * 100
    }
    let cpu_percentage = 0
    if (server_updates?.cpu != undefined) {
        cpu_percentage = server_updates?.cpu.percent
    }

    return <div className="main_content">
        <h2>Info</h2>
        <div className="layout"
             hidden={!(["running", "starting"].includes(props.server_data.status))}>
            <div className="server_info_content">
                <div className="infoindicators">

                    <div className="mem_info round_container">
                        <CircularProgressbar className="circleprogbar"
                                             value={memory_percentage}
                                             text={precisionRound(memory_percentage, 2) + "%"}/>
                        <div className="info_text">

                            Ram Usage
                            <br/>

                        </div>
                    </div>

                    <div className="cpu_info round_container">
                        <CircularProgressbar className="circleprogbar"
                                             value={cpu_percentage}
                                             text={cpu_percentage.toString() + "%"}/>
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
                    <textarea id="ta_console" readOnly={true} value={stdout.current}/>
                    <input type="text" placeholder="Type command"/>
                </div>
            </div>

            <div className="player_list">
                <h3>Player List</h3>
                <ul>
                    {
                        player_list?.online.map((player: Player) => {
                            return <PlayerListEntry player={player} on_action={(name: string, action: string) => {
                                kick_ban(name, action)
                            }} key={player.name}/>
                        })
                    }
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
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const elements: ElementProps[] = [
        {element: <ServerInfo server_data={server_data} update_servers={update_servers}/>, tab_text: "Info"},
        {element: <ServerSettings server_data={server_data.server_properties}/>, tab_text: "Settings"}
    ]

    return <SideTabElement elements={elements}/>
}

export default ServerTabs
