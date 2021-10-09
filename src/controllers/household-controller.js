const Household = require('../models/household-model')

exports.addHousehold = async request => {
  const newHousehold = new Household({ housingType: request.body.housingType })
  return newHousehold.save()
}
