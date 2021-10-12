const { Types } = require('mongoose')

const getDateString = date => date.toISOString().split('T')[0]

exports.mockObjectId = () => Types.ObjectId('6162368212490dc38a9fe196')

exports.mockFamilyMemberData = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 20)
  return {
    name: 'Dex',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 10000,
    dob: getDateString(date)
  }
}

exports.mockCoupleData = householdId => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 20)
  const names = {
    husband: 'Alex',
    wife: 'Alexa'
  }

  return [
    {
      name: names.husband,
      gender: 'Male',
      maritalStatus: 'Married',
      spouse: names.wife,
      occupationType: 'Employed',
      annualIncome: 10000,
      dob: getDateString(date),
      householdId
    },
    {
      name: names.wife,
      gender: 'Female',
      maritalStatus: 'Married',
      spouse: names.husband,
      occupationType: 'Employed',
      annualIncome: 10000,
      dob: getDateString(date),
      householdId
    }
  ]
}
