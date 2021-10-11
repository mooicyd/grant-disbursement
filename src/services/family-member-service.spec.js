const TestDb = require('../test/db')
const mocks = require('../test/mocks')
const familyMemberService = require('./family-member-service')
const Household = require('../models/household-model')
const FamilyMember = require('../models/family-member-model')

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
  it('valid', async () => {
    const household = await new Household({ housingType: 'HDB' }).save()
    const newFamilyMember = await familyMemberService.addFamilyMember(
      mocks.mockFamilyMemberData(),
      household.id
    )

    expect(newFamilyMember.householdId.toString()).toEqual(household.id)
  })

  it('invalid', async () => {
    expect.assertions(1)
    const familyMember = mocks.mockFamilyMemberData()
    familyMember.gender = ''

    try {
      await familyMemberService.addFamilyMember(familyMember, expect.anything())
    } catch (e) {
      expect(e.errors.gender.message).toEqual('gender is required')
    }
  })
})

describe('query family', () => {
  let household
  let familyMember
  beforeEach(async () => {
    household = new Household({ housingType: 'HDB' }).save()
    familyMember = mocks.mockFamilyMemberData()
    familyMember.householdId = household.id
    await FamilyMember(familyMember).save()
  })

  it('total income less than query', async () => {
    const results = await familyMemberService.queryFamily(
      { totalIncome: familyMember.annualIncome + 1 },
      [household.id]
    )

    expect(results.length).toEqual(1)
  })

  it('total income more than query', async () => {
    const results = await familyMemberService.queryFamily(
      { totalIncome: familyMember.annualIncome - 1 },
      [household.id]
    )

    expect(results.length).toEqual(0)
  })

  it('total income equal to query', async () => {
    const results = await familyMemberService.queryFamily(
      { totalIncome: familyMember.annualIncome },
      [household.id]
    )

    expect(results.length).toEqual(0)
  })
})
