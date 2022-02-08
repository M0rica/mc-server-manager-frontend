import {Properties, ServerCreationGeneral, WorldGenerationSettings} from "../Settings/SettingsModels";
import Row from "../UtilComponents/ResponsiveFormRow";
import React from "react";

import "./SettingsFields.css"

export function GeneralCreateForm(props: { handle_change: any, form_data: ServerCreationGeneral, versions: string[] }) {
    const initial_state: ServerCreationGeneral = {
        server_name: "Minecraft Server",
        type: "minecraft", version: "latest"

    }
    return <div className="create_options option_row">
        <h3>General</h3>
        <Row text="Name: ">
            <input type="text" value={props.form_data.server_name}
                   name="server_name" onChange={props.handle_change}
                   placeholder={initial_state.server_name}
            />
        </Row>
        <Row text="Server Type: ">
            <select name="type" onChange={props.handle_change}
                    defaultValue={initial_state.type}>
                <option value="minecraft">Vanilla Minecraft</option>
                <option value="spigot">Spigot</option>
                <option value="craftbukkit">Bukkit</option>
            </select>
        </Row>
        <Row text="Version: ">
            <select name="version" onChange={props.handle_change}
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
}


export function WorldGeneration(props: { handle_change: any, form_data: WorldGenerationSettings }) {
    const initial_state: WorldGenerationSettings = {
        leveltype: "default", seed: ""
    }

    return <div className="create_options option_row">
        <h3>World Generation</h3>

        <Row text="Seed: ">
            <input type="text" value={props.form_data.seed}
                   name="seed" onChange={props.handle_change}
                   placeholder="Random"
            />
        </Row>

        <Row text="Level Type: ">
            <select name="level_type" onChange={props.handle_change}
                    defaultValue={initial_state.leveltype}>
                <option value={"DEFAULT"}>Default</option>
                <option value={"AMPLIFIED"}>Amplified</option>
                <option value={"FLAT"}>Flat</option>
                <option value={"LARGEBIOMES"}>Large biomes</option>
            </select>
        </Row>
    </div>

}

export function GeneralServerSettings(props: { handle_change: any, handle_cb_change: any, form_data: Properties }) {

    return <div className="create_options option_row">
        <h3>General</h3>
        <Row text="Difficulty: ">
            <select name="difficulty" onChange={props.handle_change}
                    defaultValue={props.form_data.difficulty}>
                <option value={0}>Peaceful</option>
                <option value={1}>Easy</option>
                <option value={2}>Normal</option>
                <option value={3}>Hard</option>
            </select>
        </Row>
        <Row text="Gamemode: ">
            <select name="gamemode" onChange={props.handle_change}
                    defaultValue={props.form_data.gamemode}>
                <option value={0}>Survival</option>
                <option value={1}>Creative</option>
                <option value={2}>Adventure</option>
                <option value={3}>Spectator</option>
            </select>
        </Row>
        <Row text="Slots: ">
            <input type="number" name="max-players"
                   value={props.form_data["max-players"] || ""}
                   onChange={props.handle_change}
                   placeholder={"10"}
            />
        </Row>
        <Row text="Port: ">
            <input type="number" name="port"
                   value={props.form_data["server-port"] || ""}
                   onChange={props.handle_change}
                   placeholder={"25565"}
            />
        </Row>

    </div>

}

export function OtherSettings(props: { handle_change: any, handle_cb_change: any, form_data: Properties }) {

    return <div className="create_options option_row">
        <h3>Other</h3>
        <Row text="Motd">
            <input type="text" value={props.form_data.motd}
                   name="motd" onChange={props.handle_change}
                   placeholder={props.form_data["motd"]}/>
        </Row>
        <Row text="Allow Nether">
            <input type="checkbox" name="allow-nether" checked={props.form_data["allow-nether"]}
                   onChange={props.handle_cb_change}/>
        </Row>
        <Row text="PvP">
            <input type="checkbox" name="pvp" checked={props.form_data.pvp}
                   onChange={props.handle_cb_change}/>
        </Row>

    </div>

}
