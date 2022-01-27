import {useState} from "react";

import "./CreateServer.css"


function CreateServer() {
    const [visible, set_visible] = useState(false)

    const [name, set_name] = useState("Minecraft Server")
    const [seed, set_seed] = useState("")
    const [gamemode, set_gamemode] = useState("survival")
    const [level_type, set_level_type] = useState("DEFAULT")
    const [difficulty, set_difficulty] = useState("1")

    const submit = (e: any) => {
        e.preventDefault()
        alert(JSON.stringify({
                    name: name,
                    seed: seed,
                    gamemode: gamemode
                }, null, 2
            )
        )
    }

    return <div>
        <h2>Create new Server</h2>
        <form onSubmit={submit}>
            <label>
                Name: <input type="text" value={name} onChange={e => set_name(e.target.value)}/>
            </label>
            <br/>
            <label>
                Seed: <input type="text" value={seed} onChange={e => set_seed(e.target.value)}/>
            </label>
            <br/>
            <button type="button" onClick={e => set_visible(!visible)}>Show advanced options</button>
            <div hidden={!visible}>

                <label>
                    Gamemode:
                    <select name="Gamemode" onChange={e => set_gamemode(e.target.value)} defaultValue={gamemode}>
                        <option value="survival">Survival</option>
                        <option value="creative">Creative</option>
                    </select>
                </label>
                <br/>
                <label>
                    Level Type:
                    <select name="Gamemode" onChange={e => set_level_type(e.target.value)} defaultValue={level_type}>
                        <option value={"DEFAULT"}>Default</option>
                        <option value={"AMPLIFIED"}>Amplified</option>
                        <option value={"FLAT"}>Flat</option>
                        <option value={"LARGEBIOMES"}>Large biomes</option>
                    </select>
                </label>
                <br/>
                <label>
                    Difficulty:
                    <select name="Difficulty" onChange={e => set_difficulty(e.target.value)} defaultValue={difficulty}>
                        <option value={0}>Peaceful</option>
                        <option value={1}>Easy</option>
                        <option value={2}>Normal</option>
                        <option value={3}>Hard</option>
                    </select>
                </label>
                <br/>
            </div>
            <br/>
            <button type="submit">Create</button>
        </form>
    </div>
}

export default CreateServer
