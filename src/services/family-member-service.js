/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const FamilyMember = require('../models/family-member-model')
const { subtractYearsFromToday, isNumberString } = require('../utils/utility')

exports.addFamilyMember = async (familyMemberData, householdId) => {
  const newFamilyMember = new FamilyMember({ ...familyMemberData, householdId })
  return newFamilyMember.save()
}

exports.queryFamily = async (query, householdIds) => {
  const householdSet = new Set(householdIds)
  for (const householdId of householdIds) {
    const promises = []

    if (isNumberString(query.youngerThan)) {
      promises.push(
        FamilyMember.aggregate()
          .match({ householdId, dob: { $gt: subtractYearsFromToday(query.youngerThan) } })
          .exec()
      )
    }

    if (isNumberString(query.olderThan)) {
      promises.push(
        FamilyMember.aggregate()
          .match({ householdId, dob: { $lt: subtractYearsFromToday(query.olderThan) } })
          .exec()
      )
    }

    if (isNumberString(query.totalIncome)) {
      promises.push(
        FamilyMember.aggregate()
          .match({ householdId })
          .group({ _id: householdId, totalIncome: { $sum: '$annualIncome' } })
          .match({ totalIncome: { $lt: Number(query.totalIncome) } })
          .exec()
      )
    }

    const results = await Promise.all(promises)

    if (results.some(result => !result.length)) {
      householdSet.delete(householdId)
    }
  }

  return Array.from(householdSet)
}
