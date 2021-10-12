const mongoose = require('mongoose')
const grantsController = require('../controllers/grants-controller')

module.exports = function handler(app, opts, done) {
  mongoose.connect(process.env.GRANTS_MONGO_URI)

  app.get('/households', grantsController.listHouseholds)
  app.get('/households/:id', grantsController.getHouseholdById)
  app.get('/households/search', grantsController.searchHouseholds)

  app.post('/households', grantsController.addHousehold)
  app.post('/households/:id/members', grantsController.addFamilyMemberToHousehold)

  app.delete('/households/:id', grantsController.deleteHousehold)

  done()
}
