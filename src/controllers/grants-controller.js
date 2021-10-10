const householdService = require('../services/household-service')

exports.addHousehold = async request => {
  const newHousehold = await householdService.addHousehold(request.body)
  const response = newHousehold.toJSON({ versionKey: false })
  return response
}
