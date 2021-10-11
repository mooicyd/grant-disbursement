const Household = require('../models/household-model')

exports.addHousehold = async householdInfo => {
  const newHousehold = new Household(householdInfo)
  return newHousehold.save()
}

exports.getHouseholdById = async householdId => Household.findById(householdId)

exports.updateHousehold = async (householdId, familyMemberId) => {
  await Household.findByIdAndUpdate(householdId, { $push: { familyMembers: familyMemberId } })
  return this.getHouseholdById(householdId)
}

exports.listHouseholds = async () => Household.find().populate('familyMembers')
