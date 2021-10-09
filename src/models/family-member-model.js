const mongoose = require('mongoose')
const familyMemberSchema = require('../schemas/family-member-schema')

module.exports = mongoose.model('familyMember', familyMemberSchema)
