const householdService = require('../services/household-service')

exports.addHousehold = async request => householdService.addHousehold(request.body)
