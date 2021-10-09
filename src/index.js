require('dotenv').config()
const fastify = require('fastify')({ logger: true })

const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (e) {
    fastify.log.error(e)
    process.exit(1)
  }
}

start()
