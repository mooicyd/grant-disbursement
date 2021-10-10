const { Schema, Types } = require('mongoose')

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
  familyMembers: [{ type: Types.ObjectId, ref: 'familyMember' }]
})

module.exports = householdSchema
