const householdService = require('../services/household-service')
const familyMemberService = require('../services/family-member-service')

exports.addHousehold = async request => householdService.addHousehold(request.body)

exports.getHouseholdById = async request => householdService.getHouseholdById(request.params.id)

exports.listHouseholds = async () => householdService.listHouseholds()

exports.addFamilyMemberToHousehold = async request => {
  const household = await householdService.getHouseholdById(request.params.id)
  if (household) {
    const newFamilyMember = await familyMemberService.addFamilyMember(request.body, household.id)
    await householdService.updateHousehold(household.id, newFamilyMember.id)
    return newFamilyMember
  }

  throw Error('Household not found')
}

exports.searchHouseholds = async request => {
  const households = await householdService.queryHouseholds(request.query)

  return householdService.getHouseholdsByIds(households)
}
