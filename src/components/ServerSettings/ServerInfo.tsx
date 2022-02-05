import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import "./ServerSettings.css"
import SideTabElement, {ElementProps} from "../SideTabElement/SideTabElement"
import {useEffect, useState} from "react";
import {get_size, precisionRound} from "../../utils/helper_functions";
import {log_str} from "./log_str";
import {Icon} from "@mdi/react";
import {mdiRestart, mdiStop} from "@mdi/js";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {useParams} from "react-router-dom"; // Import css


function PlayerListEntry(props: { name: string, on_action: any }) {

    return <li>
        <div className="player_entry">
            {props.name}
            <div>
                <button onClick={() => props.on_action(props.name, "ban")}>Ban</button>
                <button onClick={() => props.on_action(props.name, "kick")}>Kick</button>
            </div>
        </div>

    </li>
}

function ServerInfo() {
    const {server_name} = useParams()

    const [data, set_data] = useState({
        cpu_usage: 0.1,
        mem_usage: 0,
        max_mem: 8000000000,
        players: 5,
        slots: 10,
    })

    useEffect(() => {
        if (server_name == "hypixel"){
            set_data({
                cpu_usage: 0.1,
                mem_usage: 0,
                max_mem: 8000000000,
                players: 5,
                slots: 10,
            })
        }
        else{
            set_data({
                cpu_usage: 0.1,
                mem_usage: 2147483648,
                max_mem: 8000000000,
                players: 5,
                slots: 10,
            })
        }
    }, [server_name])


    const percentage = precisionRound(data.mem_usage / data.max_mem * 100, 1)

    const kick_ban = (name: string, action: string) => {
        const options = {
            title: 'Confirmation',
            message: `Do you want to ${action} ${name}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        }
        confirmAlert(options)
    }

    return <div className="main_content">
        <h2>Info</h2>
        <div className="layout" hidden={data.mem_usage == 0}>
            <div className="server_info_content">
                <div className="infoindicators">
                    <div className="mem_info round_container">
                        <CircularProgressbar className="circleprogbar"
                                             value={percentage} text={percentage.toString() + "%"}/>
                        <div className="info_text">

                            Ram Usage
                            <br/>
                            {get_size(data.mem_usage)} / {get_size(data.max_mem)}

                        </div>
                    </div>

                    <div className="cpu_info round_container">
                        <CircularProgressbar className="circleprogbar"
                                             value={data.cpu_usage * 100}
                                             text={(data.cpu_usage * 100).toString() + "%"}/>
                        <div className="info_text">

                            CPU Usage

                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <button><Icon path={mdiStop} className="icon"/> Stop</button>
                    <button><Icon path={mdiRestart} className="icon"/> Restart</button>
                </div>

                <div className="console">
                    <textarea contentEditable={false} defaultValue={log_str}/>
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

        <div className="layout" hidden={data.mem_usage != 0}>
            Server is currently offline
            <button>Start Server</button>
        </div>
    </div>
}

function ServerSettings() {
    return <div>
        <h2>Settings</h2>
    </div>
}


function ServerTabs() {
    // const {server_name} = useParams()
    // for later

    const elements: ElementProps[] = [
        {element: <ServerInfo/>, tab_text: "Info"},
        {element: <ServerSettings/>, tab_text: "Settings"}
    ]

    return <SideTabElement elements={elements}/>

}

export default ServerTabs
