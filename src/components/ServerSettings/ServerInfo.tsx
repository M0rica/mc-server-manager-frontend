import {useParams} from "react-router-dom";

import "./ServerSettings.css"
import SideTabElement, {ElementProps} from "../SideTabElement/SideTabElement"

function ServerIndex(){
    return <div>
        <h2>Info</h2>
    </div>
}

function ServerSettings(){
    return <div>
        <h2>Settings</h2>
    </div>
}


function ServerInfo() {
    const {server_name} = useParams()

    console.log(server_name)

    const elements: ElementProps[] = [
        {element: <ServerIndex/>, tab_text: "Info"},
        {element: <ServerSettings/>, tab_text: "Settings"}
    ]

    return <SideTabElement elements={elements}/>

}

export default ServerInfo
