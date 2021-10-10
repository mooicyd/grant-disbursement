const db = require('../test/db')
const familyMemberService = require('./family-member-service')

beforeAll(async () => {
  await db.setup()
})

afterEach(async () => {
  await db.reset()
})

afterAll(async () => {
  await db.teardown()
})

describe('add family member', () => {
  const mockFamilyMember = () => ({
    name: 'Dex',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 1,
    dob: '1990-01-01'
  })

  it('valid', async () => {
    const newFamilyMember = await familyMemberService.addFamilyMember(mockFamilyMember())

    expect(newFamilyMember).toBeTruthy()
  })

  it('invalid', async () => {
    expect.assertions(1)
    const familyMember = mockFamilyMember()
    familyMember.gender = ''

    try {
      await familyMemberService.addFamilyMember(familyMember)
    } catch (e) {
      expect(e.errors.gender.message).toEqual('gender is required')
    }
  })
})
