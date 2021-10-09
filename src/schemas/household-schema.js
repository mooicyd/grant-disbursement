const { Schema } = require('mongoose')
const familyMemberSchema = require('./family-member-schema')

const housingTypes = ['HDB', 'Condominium', 'Landed']

const householdSchema = new Schema({
  housingType: {
    type: String,
    enum: {
      values: housingTypes,
      message: `housingType must be one of the following: ${housingTypes.join(', ')}`
    },
    required: [true, 'housingType is required']
  },
  familyMembers: [familyMemberSchema]
})

module.exports = householdSchema
