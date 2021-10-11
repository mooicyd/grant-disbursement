/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const FamilyMember = require('../models/family-member-model')
const utility = require('../utils/utility')

exports.addFamilyMember = async (familyMemberData, householdId) => {
  const newFamilyMember = new FamilyMember({ ...familyMemberData, householdId })
  return newFamilyMember.save()
}

exports.queryFamily = async (query, householdIds) => {
  const householdSet = new Set(householdIds)
  for (const householdId of householdIds) {
    const promises = []

    if (utility.isNumberString(query.youngerThan)) {
      const date = new Date()
      date.setFullYear(date.getFullYear() - query.youngerThan)
      date.setUTCHours(0, 0, 0, 0)
      promises.push(
        FamilyMember.aggregate()
          .match({ householdId, dob: { $gt: date } })
          .exec()
      )
    }

    if (utility.isNumberString(query.olderThan)) {
      const date = new Date()
      date.setFullYear(date.getFullYear() - query.olderThan)
      date.setUTCHours(0, 0, 0, 0)
      promises.push(
        FamilyMember.aggregate()
          .match({ householdId, dob: { $lt: date } })
          .exec()
      )
    }

    if (utility.isNumberString(query.totalIncome)) {
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
