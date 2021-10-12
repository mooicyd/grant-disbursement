/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const FamilyMember = require('../models/family-member-model')
const { subtractYearsFromToday, isNumberString } = require('../utils/utility')

const hasCouple = householdId =>
  FamilyMember.aggregate()
    .match({ householdId })
    .lookup({
      from: 'familymembers',
      localField: 'spouse',
      foreignField: 'name',
      as: 'spouseName'
    })
    .unwind('$spouseName')
    .exec()

const totalIncomeLessThanValue = (householdId, totalIncome) =>
  FamilyMember.aggregate()
    .match({ householdId })
    .group({ _id: householdId, totalIncome: { $sum: '$annualIncome' } })
    .match({ totalIncome: { $lt: Number(totalIncome) } })
    .exec()

const membersOlderThan = (householdId, age) =>
  FamilyMember.aggregate()
    .match({ householdId, dob: { $lt: subtractYearsFromToday(age) } })
    .exec()

const membersYoungerThan = (householdId, age) =>
  FamilyMember.aggregate()
    .match({ householdId, dob: { $gt: subtractYearsFromToday(age) } })
    .exec()

exports.addFamilyMember = async (familyMemberData, householdId) => {
  const newFamilyMember = new FamilyMember({ ...familyMemberData, householdId })
  return newFamilyMember.save()
}

exports.queryFamily = async (query, householdIds) => {
  const householdSet = new Set(householdIds)
  for (const householdId of householdIds) {
    const promises = []

    if (isNumberString(query.youngerThan)) {
      promises.push(membersYoungerThan(householdId, query.youngerThan))
    }

    if (isNumberString(query.olderThan)) {
      promises.push(membersOlderThan(householdId, query.olderThan))
    }

    if (isNumberString(query.totalIncome)) {
      promises.push(totalIncomeLessThanValue(householdId, query.totalIncome))
    }

    if (query.hasCouple === 'true') {
      promises.push(hasCouple(householdId))
    }

    const results = await Promise.all(promises)

    if (results.some(result => !result.length)) {
      householdSet.delete(householdId)
    }
  }

  return Array.from(householdSet)
}

exports.deleteFamilyMembersByHouseholdId = async householdId =>
  FamilyMember.deleteMany({ householdId })
