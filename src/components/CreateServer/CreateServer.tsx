import React, {useState} from "react";

import "./CreateServer.css"
import Accordion from "../UtilComponents/Accordion";
import Row from "../UtilComponents/ResponsiveFormRow";
import {default_ip} from "../../utils/globals";

function get_versions(): string[] {
    return ["latest", "1.18", "1.8.9"]
}

interface FormData {
    name: string
    seed: string
    version: string
    gamemode: string
    level_type: string
    difficulty: number
    type: string
}

function CreateServer() {
    const initial_state: FormData = {
        name: "Minecraft Server",
        seed: "",
        version: "latest",
        gamemode: "surivival",
        level_type: "default",
        difficulty: 1,
        type: "spigot"
    }

    const [form_data, set_data] = useState(initial_state)

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const name = event.target.name;
        const value = event.target.value;
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
                if (!response.ok){
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch(error => console.error(error));
    }

    return <div>
        <h2>Create new Server</h2>
        <form onSubmit={submit}>
            <Row text="Name: ">
                <input type="text" name="name"
                       value={form_data.name || ""}
                       onChange={handleChange}
                       placeholder={initial_state.name}
                />
            </Row>

            <Row text="Seed: ">
                <input type="text" value={form_data.seed}
                       name="seed" onChange={handleChange}
                       placeholder="Random"
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

            <Accordion>
                <Row text="Gamemode: ">
                    <select name="gamemode" onChange={handleChange}
                            defaultValue={initial_state.gamemode}>
                        <option value="survival">Survival</option>
                        <option value="creative">Creative</option>
                    </select>
                </Row>

                <Row text="Level Type: ">
                    <select name="gamemode" onChange={handleChange}
                            defaultValue={initial_state.level_type}>
                        <option value={"DEFAULT"}>Default</option>
                        <option value={"AMPLIFIED"}>Amplified</option>
                        <option value={"FLAT"}>Flat</option>
                        <option value={"LARGEBIOMES"}>Large biomes</option>
                    </select>
                </Row>

                <Row text="Difficulty: ">
                    <select name="difficulty" onChange={handleChange}
                            defaultValue={initial_state.difficulty}>
                        <option value={0}>Peaceful</option>
                        <option value={1}>Easy</option>
                        <option value={2}>Normal</option>
                        <option value={3}>Hard</option>
                    </select>
                </Row>

            </Accordion>
            <button type="submit">Create</button>
        </form>
    </div>
}

export default CreateServer
