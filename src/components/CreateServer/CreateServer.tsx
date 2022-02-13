import React, {useState} from "react";

import "./CreateServer.css"
import {default_ip} from "../../utils/globals";
import {useNavigate} from "react-router-dom";
import {ServerCreationGeneral, WorldGenerationSettings} from "../ServerInfo/SettingsModels";
import {GeneralCreateForm, WorldGeneration} from "../SettingsFields/SettingsFields";

type creation_data = ServerCreationGeneral & WorldGenerationSettings

const initial_state: creation_data = {
    leveltype: "default",
    seed: "",
    server_name: "Minecraft Server",
    type: "minecraft",
    version: "latest",
}

function CreateServer(props: { versions: string[] }) {

    const [form_data, set_data] = useState<creation_data>(initial_state)
    let nav = useNavigate()

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        console.log("Change")
        const name = event.target.name
        const value = event.target.value
        set_data(values => ({...values, [name]: value}))
    }

    const submit = (e: any) => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form_data)
        }
        fetch(`${default_ip}/api/servers`, requestOptions)
            .then(async response => {
                const is_json = response.headers.get("content-type")
                const data = is_json && await response.json()
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.id != 0){
                    nav(`/server/${data.id}`)
                }

            })
            .catch(error => alert(error));
    }

    return <div>
        <h2>Create new Server</h2>
        <div className="form_content">
            <GeneralCreateForm form_data={form_data} handle_change={handleChange} versions={props.versions}/>
            <WorldGeneration handle_change={handleChange} form_data={form_data}/>
        </div>
        <div className="max_width">
            <button onClick={submit}>Create</button>
            <p>By creating the server, you accept <a
                href="https://account.mojang.com/documents/minecraft_eula">EULA</a> and <a
                href="https://go.microsoft.com/fwlink/?LinkId=521839">Privacy policy</a> by Mojang</p>
        </div>
    </div>
}

export default CreateServer
