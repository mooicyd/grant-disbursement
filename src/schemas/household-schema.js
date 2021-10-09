const { Schema } = require('mongoose')
const familyMemberSchema = require('./family-member-schema')

const householdSchema = new Schema({
  housingType: {
    type: String,
    enum: ['HDB', 'Condominium', 'Landed'],
    required: true
  },
  familyMembers: [familyMemberSchema]
})

module.exports = householdSchema
