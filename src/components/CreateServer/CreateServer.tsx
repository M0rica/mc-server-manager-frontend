import React, {useState} from "react";

import "./CreateServer.css"
import Row from "../UtilComponents/ResponsiveFormRow";
import {default_ip} from "../../utils/globals";

function get_versions(): string[] {
    return ["latest", "1.18", "1.8.9"]
}


function CreateServer() {
    const initial_state = {
        name: "Minecraft Server",
        world_name: "world",
        seed: "",
        version: "latest",
        gamemode: "surivival",
        level_type: "default",
        difficulty: 1,
        type: "spigot",
        slots: 10,
        port: 25565,
        allow_nether: true,
        motd: "Welcome to my Server"
    }

    const [form_data, set_data] = useState(initial_state)

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const name = event.target.name
        const value = event.target.value
        set_data(values => ({...values, [name]: value}))
    }

    const handle_change_checkbox = (event: {target: {name: any, checked: boolean}}) => {
        const name = event.target.name
        const value = event.target.checked
        set_data(values => ({...values, [name]: value}))
    }

    const submit = (e: any) => {
        e.preventDefault()

        alert(JSON.stringify(form_data, null, 4))

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
            })
            .catch(error => console.error(error));
    }

    // @ts-ignore
    // @ts-ignore
    return <div>
        <h2>Create new Server</h2>
        <form onSubmit={submit}>
            <div className="option_row">
                <div className="create_options">
                    <h3>General Options</h3>
                    <Row text="Name: ">
                        <input type="text" name="name"
                               value={form_data.name || ""}
                               onChange={handleChange}
                               placeholder={initial_state.name}
                        />
                    </Row>
                    <Row text="Server Type: ">
                        <select name="type" onChange={handleChange}
                                defaultValue={initial_state.type}>
                            <option value="default">Vanilla Minecraft</option>
                            <option value="spigot">Spigot</option>
                            <option value="craftbukkit">Bukkit</option>
                        </select>
                    </Row>

                    <Row text="Version: ">
                        <select name="version" onChange={handleChange}
                                defaultValue={initial_state.version}>
                            {
                                get_versions().map((version: string) => {
                                        return <option value={version} key={version}>{version}</option>
                                    }
                                )
                            }
                        </select>
                    </Row>

                </div>

                <div className="create_options">
                    <h3>Appearance</h3>
                    <Row text="Difficulty: ">
                        <select name="difficulty" onChange={handleChange}
                                defaultValue={initial_state.difficulty}>
                            <option value={0}>Peaceful</option>
                            <option value={1}>Easy</option>
                            <option value={2}>Normal</option>
                            <option value={3}>Hard</option>
                        </select>
                    </Row>

                    <Row text="Allow Nether">
                        <input type="checkbox" name="allow_nether" checked={form_data.allow_nether} onChange={handle_change_checkbox}/>
                    </Row>

                    <Row text="Motd">
                        <input type="text" value={form_data.motd}
                               name="motd" onChange={handleChange}
                               placeholder={initial_state.motd}/>
                    </Row>

                </div>
            </div>
            <div className="option_row">
                <div className="create_options">
                    <h3>Server Settings</h3>
                    <Row text="Slots: ">
                        <input type="number" name="slots"
                               value={form_data.slots || ""}
                               onChange={handleChange}
                               placeholder={initial_state.slots.toString()}
                        />
                    </Row>
                    <Row text="Port: ">
                        <input type="number" name="port"
                               value={initial_state.port || ""}
                               onChange={handleChange}
                               placeholder={initial_state.port.toString()}
                        />
                    </Row>
                </div>

                <div className="create_options">
                    <h3>World Generation</h3>
                    <Row text="World name: ">
                        <input type="text" name="world_name"
                               value={form_data.world_name || ""}
                               onChange={handleChange}
                               placeholder={initial_state.world_name}
                        />
                    </Row>

                    <Row text="Seed: ">
                        <input type="text" value={form_data.seed}
                               name="seed" onChange={handleChange}
                               placeholder="Random"
                        />
                    </Row>

                    <Row text="Level Type: ">
                        <select name="level_type" onChange={handleChange}
                                defaultValue={initial_state.level_type}>
                            <option value={"DEFAULT"}>Default</option>
                            <option value={"AMPLIFIED"}>Amplified</option>
                            <option value={"FLAT"}>Flat</option>
                            <option value={"LARGEBIOMES"}>Large biomes</option>
                        </select>
                    </Row>
                    <Row text="Gamemode: ">
                        <select name="gamemode" onChange={handleChange}
                                defaultValue={initial_state.gamemode}>
                            <option value="survival">Survival</option>
                            <option value="creative">Creative</option>
                        </select>
                    </Row>
                </div>
            </div>


            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    </div>
}

export default CreateServer
