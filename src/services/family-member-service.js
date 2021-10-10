const FamilyMember = require('../models/family-member-model')

exports.addFamilyMember = async (familyMemberData, householdId) => {
  const newFamilyMember = new FamilyMember({ ...familyMemberData, householdId })
  return newFamilyMember.save()
}
