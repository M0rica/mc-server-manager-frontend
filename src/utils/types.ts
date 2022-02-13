import {Properties} from "../components/ServerInfo/SettingsModels";

export interface ServerData {
    id: number,
    name: string,
    network_config: {
        port: number
    },
    hardware_config: {
        ram: number
    },
    status: string,
    path: {
        base_path: string,
        jar_path: string,
        server_properties_file: string
    },
    server_manager_data: {
        installed: boolean,
        version: string,
        created_at: string
    },
    server_properties: Properties,
    online_stats: {
        ping?: number
        players?: string[]
    }

}

export const loading_server_data: ServerData = {
    hardware_config: {
        ram: 0
    },
    id: 0,
    name: "Loading",
    network_config: {port: 0},
    online_stats: {},
    path: {base_path: "", jar_path: "", server_properties_file: ""},
    server_manager_data: {created_at: "", installed: false, version: ""},
    status: "Loading",
    server_properties: {
        difficulty: 1,
        motd: "",
        "max-players": 0,
        "server-port": 25565,
        gamemode: "survival",
        pvp: true,
        "allow-nether": true
    }
}
