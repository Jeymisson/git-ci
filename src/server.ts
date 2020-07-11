import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { config } from './config'
import { main } from './main'

const app = new Koa()

app.use(bodyParser())
app.use(main.routes()).use(main.allowedMethods())
app.listen(config.port)

console.log(`Server running on port ${config.port}`)