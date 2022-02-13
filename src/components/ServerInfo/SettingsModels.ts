
export interface ServerCreationGeneral{
    server_name: string
    type: string
    version: string
}

export interface WorldGenerationSettings {
    seed: string
    leveltype: string
}

export interface Properties {
    "difficulty"?: number
    "motd"?: string
    "max-players"?: number
    "server-port"?: number
    "gamemode"?: string
    "pvp"?: boolean
    "allow-nether"?: boolean
}

export interface AdvancedSettings{

}


