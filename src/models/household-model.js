const mongoose = require('mongoose')
const householdSchema = require('../schemas/household-schema')

module.exports = mongoose.model('household', householdSchema)
