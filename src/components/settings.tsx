import React, {useState} from "react";
import {default_ip} from "../utils/globals";


function Settings() {
    const [ip_settings, set_default_ip] = useState(default_ip);

    return (
        <div>
            <h2>Settings</h2>
            <label>
            Default IP: <input defaultValue={default_ip} type="text" onChange={(e) => set_default_ip(e.target.value)}/>
            </label>
                <p>{ip_settings}</p>
        </div>

    )
}

export default Settings
