const { Schema } = require('mongoose')

const familyMemberSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married'], required: true },
  spouse: { type: String },
  occupationType: { type: String, enum: ['Unemployed', 'Student', 'Employed'], required: true },
  annualIncome: { type: Number, min: 0, default: 0 },
  dob: { type: Date, required: true }
})

module.exports = familyMemberSchema
