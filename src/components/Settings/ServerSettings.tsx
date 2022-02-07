import {GeneralServerSettings, OtherSettings} from "./SettingsFields";
import React, {useState} from "react";
import {Properties} from "./SettingsModels";


function ServerSettings(props: { server_data: Properties }) {
    const properties = props.server_data
    const [form_data, set_data] = useState(properties)

    const [changed_options, set_option] = useState<Properties>({})

    const submit = () => {
        alert(JSON.stringify(changed_options, null, 4))
    }

    const handle_change = (event: { target: { name: string; value: any; placeholder: string}; }) => {
        console.log(event)
        const name: string = event.target.name
        const value = event.target.value
        set_data(values => ({...values, [name]: value}))
        set_option(values => ({...values, [name]: value}))
    }
    const handle_cb_change = (event: { target: { name: string; checked: any; }; }) => {
        const name = event.target.name
        const value = event.target.checked
        set_data(values => ({...values, [name]: value}))
        set_option(values => ({...values, [name]: value}))
    }

    return <div className="main_content">
        <h2>Settings</h2>

        <GeneralServerSettings form_data={form_data} handle_cb_change={handle_cb_change} handle_change={handle_change}/>
        <OtherSettings handle_change={handle_change} handle_cb_change={handle_cb_change} form_data={form_data}/>
        <div className="max_width">
            <button onClick={submit}>Restart Server and apply</button>
        </div>
    </div>
}

export default ServerSettings
