const FamilyMember = require('../models/family-member-model')

exports.addFamilyMember = async familyMember => {
  const newFamilyMember = new FamilyMember(familyMember)
  return newFamilyMember.save()
}
