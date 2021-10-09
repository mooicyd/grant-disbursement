const { Schema } = require('mongoose')

const genders = ['Male', 'Female']
const occupationTypes = ['Unemployed', 'Student', 'Employed']

const familyMemberSchema = new Schema({
  name: { type: String, required: [true, 'name is required'] },
  gender: {
    type: String,
    enum: {
      values: genders,
      message: `gender must be one of the following: ${genders.join(', ')}`
    },
    required: [true, 'gender is required']
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married'],
    default: 'Single'
  },
  spouse: { type: String },
  occupationType: {
    type: String,
    enum: {
      values: occupationTypes,
      message: `occupationType must be one of the following: ${occupationTypes.join(', ')}`
    }
  },
  annualIncome: { type: Number, min: 0, default: 0 },
  dob: { type: Date, required: [true, 'dob is required'] }
})

module.exports = familyMemberSchema
