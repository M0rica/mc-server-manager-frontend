// export const default_ip: string = window.location.protocol + "//"+ window.location.host

const port = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 5000 : window.location.port
export const default_ip: string = window.location.protocol + "//"+ window.location.hostname + ":" + port
