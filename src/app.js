const fastify = require('fastify')
const grantsRouter = require('./routers/grants-router')

const start = (options = {}) => {
  const app = fastify(options)

  app.register(grantsRouter)

  return app
}

module.exports = start
