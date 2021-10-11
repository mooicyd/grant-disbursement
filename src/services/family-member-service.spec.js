const TestDb = require('../test/db')
const familyMemberService = require('./family-member-service')
const Household = require('../models/household-model')

const testDb = new TestDb()

beforeAll(async () => {
  await testDb.setup()
})

beforeEach(async () => {
  await testDb.reset()
})

afterAll(async () => {
  await testDb.teardown()
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
    const household = await new Household({ housingType: 'HDB' }).save()
    const newFamilyMember = await familyMemberService.addFamilyMember(
      mockFamilyMember(),
      household.id
    )

    expect(newFamilyMember.householdId.toString()).toEqual(household.id)
  })

  it('invalid', async () => {
    expect.assertions(1)
    const familyMember = mockFamilyMember()
    familyMember.gender = ''

    try {
      await familyMemberService.addFamilyMember(familyMember, expect.anything())
    } catch (e) {
      expect(e.errors.gender.message).toEqual('gender is required')
    }
  })
})
