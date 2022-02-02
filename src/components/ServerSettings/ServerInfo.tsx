import {useParams} from "react-router-dom";

import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import "./ServerSettings.css"
import SideTabElement, {ElementProps} from "../SideTabElement/SideTabElement"
import {useState} from "react";
import {get_size, precisionRound} from "../../utils/helper_functions";

const infos = {
    cpu_usage: 0.1,
    mem_usage: 2147483648,
    max_mem: 8000000000,
    players: 5,
    slots: 10,
}


function ServerInfo() {

    const [data, set_data] = useState(infos)

    const percentage = precisionRound(data.mem_usage / data.max_mem * 100, 1)
    return <div>
        <h2>Info</h2>

        <div className="infoindicators">
            <div className="mem_info round_container">
                <CircularProgressbar className="circleprogbar"
                                     value={percentage} text={percentage.toString() + "%"}/>
                <div className="info_text">
                    <text>
                        Ram Usage
                    </text>
                    <text>
                        {get_size(data.mem_usage)} / {get_size(data.max_mem)}
                    </text>
                </div>
            </div>

            <div className="cpu_info round_container">
                <CircularProgressbar className="circleprogbar"
                                     value={data.cpu_usage * 100} text={(data.cpu_usage * 100).toString() + "%"}/>
                <div className="info_text">
                    <text>
                        CPU Usage
                    </text>
                    <br/>
                </div>
            </div>
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
