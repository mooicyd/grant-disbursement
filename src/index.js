require('dotenv/config')
const server = require('./app')({ logger: true })

const start = async () => {
  try {
    await server.listen(process.env.APP_PORT)
  } catch (e) {
    server.log.error(e)
    process.exit(1)
  }
}

start()
