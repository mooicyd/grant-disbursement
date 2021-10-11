const mockFamilyMemberData = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 20)
  return {
    name: 'Dex',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 10000,
    dob: date.toISOString().split('T')[0]
  }
}

module.exports = { mockFamilyMemberData }
