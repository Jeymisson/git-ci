import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export interface Config {
    port: number;
    debugLogging: boolean;
}

const isDevMode = process.env.NODE_ENV == 'development'

const config: Config = {
    port: +(process.env.PORT || 8080),
    debugLogging: isDevMode,
}

export { config }