const householdService = require('../services/household-service')

exports.addHousehold = async request => householdService.addHousehold(request.body)
exports.getHouseholdById = async request => householdService.getHouseholdById(request.params.id)
