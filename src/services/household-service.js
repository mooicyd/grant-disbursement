const Household = require('../models/household-model')
const { isNumberString } = require('../utils/utility')

exports.addHousehold = async householdInfo => {
  const newHousehold = new Household(householdInfo)
  return newHousehold.save()
}

exports.getHouseholdById = async householdId =>
  Household.findById(householdId).populate('familyMembers').exec()

exports.updateHousehold = async (householdId, familyMemberId) => {
  await Household.findByIdAndUpdate(householdId, { $push: { familyMembers: familyMemberId } })
  return this.getHouseholdById(householdId)
}

exports.listHouseholds = async () => Household.find().populate('familyMembers').exec()

exports.queryHouseholds = async query => {
  const mongoQuery = Household.aggregate()

  if (query.housingType) {
    mongoQuery.match({ housingType: query.housingType })
  }
  if (isNumberString(query.familySize)) {
    mongoQuery.match({ familyMembers: { $size: Number(query.familySize) } })
  }

  const results = await mongoQuery.project({ _id: 1 }).exec()

  return results.map(result => result._id)
}

exports.getHouseholdsByIds = async householdIds =>
  Household.aggregate()
    .match({ _id: { $in: householdIds } })
    .lookup({
      from: 'familymembers',
      localField: 'familyMembers',
      foreignField: '_id',
      as: 'familyMembers'
    })
    .exec()

exports.deleteHouseholdById = async householdId => Household.findByIdAndDelete(householdId)
