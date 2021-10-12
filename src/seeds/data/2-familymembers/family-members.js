/* eslint-disable import/no-extraneous-dependencies */
const { getObjectId } = require('mongo-seeding')
const { generateDobForAge } = require('../../helpers/age-helper')

const familyMembers = [
  {
    id: getObjectId('Alex'),
    name: 'Alex',
    gender: 'Male',
    maritalStatus: 'Married',
    spouse: 'Alexa',
    occupationType: 'Employed',
    annualIncome: 50000,
    dob: generateDobForAge(30),
    householdId: getObjectId('household1')
  },
  {
    id: getObjectId('Alexa'),
    name: 'Alexa',
    gender: 'Female',
    maritalStatus: 'Married',
    spouse: 'Alex',
    occupationType: 'Employed',
    annualIncome: 24000,
    dob: generateDobForAge(30),
    householdId: getObjectId('household1')
  },
  {
    id: getObjectId('Rich'),
    name: 'Rich',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 2000000,
    dob: generateDobForAge(30),
    householdId: getObjectId('household2')
  },
  {
    id: getObjectId('Rich Old'),
    name: 'Rich Old',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 2000000,
    dob: generateDobForAge(55),
    householdId: getObjectId('household3')
  },
  {
    id: getObjectId('Kelvin'),
    name: 'Kelvin',
    gender: 'Male',
    maritalStatus: 'Married',
    spouse: 'Lydia',
    occupationType: 'Employed',
    annualIncome: 60000,
    dob: generateDobForAge(55),
    householdId: getObjectId('household4')
  },
  {
    id: getObjectId('Lydia'),
    name: 'Lydia',
    gender: 'Female',
    maritalStatus: 'Married',
    spouse: 'Kelvin',
    occupationType: 'Employed',
    annualIncome: 40000,
    dob: generateDobForAge(55),
    householdId: getObjectId('household4')
  },
  {
    id: getObjectId('Jack'),
    name: 'Jack',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Student',
    annualIncome: 12000,
    dob: generateDobForAge(17),
    householdId: getObjectId('household4')
  },
  {
    id: getObjectId('Dean'),
    name: 'Dean',
    gender: 'Male',
    maritalStatus: 'Married',
    spouse: 'May',
    occupationType: 'Employed',
    annualIncome: 240000,
    dob: generateDobForAge(40),
    householdId: getObjectId('household5')
  },
  {
    id: getObjectId('May'),
    name: 'May',
    gender: 'Female',
    maritalStatus: 'Married',
    spouse: 'Dean',
    occupationType: 'Unemployed',
    annualIncome: 0,
    dob: generateDobForAge(37),
    householdId: getObjectId('household5')
  },
  {
    id: getObjectId('Ah Gong'),
    name: 'Ah Gong',
    gender: 'Male',
    maritalStatus: 'Married',
    spouse: 'Ah Ma Left',
    occupationType: 'Unemployed',
    annualIncome: 0,
    dob: generateDobForAge(60),
    householdId: getObjectId('household6')
  },
  {
    id: getObjectId('Dickson'),
    name: 'Dickson',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 60000,
    dob: generateDobForAge(35),
    householdId: getObjectId('household6')
  },
  {
    id: getObjectId('Alexandra'),
    name: 'Alexandra',
    gender: 'Female',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 40000,
    dob: generateDobForAge(33),
    householdId: getObjectId('household6')
  },
  {
    id: getObjectId('Childe'),
    name: 'Childe',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Unemployed',
    annualIncome: 0,
    dob: generateDobForAge(4),
    householdId: getObjectId('household6')
  },
  {
    id: getObjectId('Ah Ma'),
    name: 'Ah Ma',
    gender: 'Female',
    maritalStatus: 'Married',
    spouse: 'Ah Gong Left',
    occupationType: 'Employed',
    annualIncome: 36000,
    dob: generateDobForAge(66),
    householdId: getObjectId('household7')
  },
  {
    id: getObjectId('Jean'),
    name: 'Jean',
    gender: 'Female',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Student',
    annualIncome: 36000,
    dob: generateDobForAge(17),
    householdId: getObjectId('household7')
  }
]

// {
//   name: 'Alex',
//   gender: 'Male',
//   maritalStatus: 'Single',
//   spouse: '',
//   occupationType: 'Employed',
//   annualIncome: 24000,
//   dob: generateDobForAge(30),
//   householdId: getObjectId('household1')
// }

module.exports = familyMembers
