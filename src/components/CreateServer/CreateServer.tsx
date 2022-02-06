import React, {useState} from "react";

import "./CreateServer.css"
import Row from "../UtilComponents/ResponsiveFormRow";
import {default_ip} from "../../utils/globals";
import {useNavigate} from "react-router-dom";


const initial_state = {
    name: "Minecraft Server",
    world_name: "world",
    seed: "",
    version: "latest",
    gamemode: "surivival",
    leveltype: "default",
    difficulty: 1,
    type: "spigot",
    slots: 10,
    port: 25565,
    allow_nether: true,
    motd: "Welcome to my Server"
}

function CreateServer(props: { versions: string[] }) {

    const [form_data, set_data] = useState(initial_state)
    let nav = useNavigate()

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const name = event.target.name
        const value = event.target.value
        set_data(values => ({...values, [name]: value}))
    }

    const handle_change_checkbox = (event: { target: { name: any, checked: boolean } }) => {
        const name = event.target.name
        const value = event.target.checked
        set_data(values => ({...values, [name]: value}))
    }

    const submit = (e: any) => {
        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": form_data.name,
                "type": form_data.type,
                "version": form_data.version,
                "seed": form_data.seed,
                "gamemode": form_data.gamemode,
                "leveltype": form_data.leveltype
            })
        }
        fetch(`${default_ip}/api/servers`, requestOptions)
            .then(async response => {
                const is_json = response.headers.get("content-type")
                const data = is_json && await response.json()
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                nav("/")

            })
            .catch(error => alert(error));
    }

    return <div>
        <h2>Create new Server</h2>
        <div className="form_content">
            <form className="create_form" onSubmit={submit}>
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
                                <option value="minecraft">Vanilla Minecraft</option>
                                <option value="spigot">Spigot</option>
                                <option value="craftbukkit">Bukkit</option>
                            </select>
                        </Row>

                        <Row text="Version: ">
                            <select name="version" onChange={handleChange}
                                    defaultValue={initial_state.version}>
                                {
                                    props.versions.map((version: string) => {
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
                            <input type="checkbox" name="allow_nether" checked={form_data.allow_nether}
                                   onChange={handle_change_checkbox}/>
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
                                    defaultValue={initial_state.leveltype}>
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

                <div className="max_width">
                    <button type="submit">Create</button>
                <p>By creating the server, you accept <a
                    href="https://account.mojang.com/documents/minecraft_eula">EULA</a> and <a
                    href="https://go.microsoft.com/fwlink/?LinkId=521839">Privacy policy</a> by Mojang</p>
                </div>
            </form>
        </div>
    </div>
}

export default CreateServer
