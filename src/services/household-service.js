const Household = require('../models/household-model')

exports.addHousehold = async householdInfo => {
  const newHousehold = new Household(householdInfo)
  return newHousehold.save()
}

exports.getHouseholdById = async householdId => Household.findById(householdId)
