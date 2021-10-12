const mongoose = require('mongoose')
const grantsController = require('../controllers/grants-controller')

module.exports = function handler(app, opts, done) {
  const routeOpts = {
    errorHandler(error, request, reply) {
      reply.send({ message: error.message })
    }
  }
  mongoose.connect(process.env.GRANTS_MONGO_URI)

  app.get('/households', grantsController.listHouseholds)
  app.get('/households/:id', grantsController.getHouseholdById)
  app.get('/search', grantsController.searchHouseholds)

  app.post('/households', grantsController.addHousehold)
  app.post('/households/:id/members', routeOpts, grantsController.addFamilyMemberToHousehold)

  app.delete('/households/:id', grantsController.deleteHousehold)

  done()
}
