const TestDb = require('../test/db')
const {
  mockFamilyMemberData,
  mockCoupleData,
  mockObjectIdString,
  mockObjectId
} = require('../test/mocks')
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
      mockFamilyMemberData(),
      household.id
    )

    expect(newFamilyMember.householdId.toString()).toEqual(household.id)
  })

  it('invalid', async () => {
    expect.assertions(1)
    const familyMember = mockFamilyMemberData()
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
  let age
  beforeEach(async () => {
    household = new Household({ housingType: 'HDB' }).save()

    familyMember = mockFamilyMemberData()
    familyMember.householdId = household.id
    await FamilyMember(familyMember).save()

    age = new Date().getFullYear() - new Date(familyMember.dob).getFullYear()
  })

  it('no query', async () => {
    const results = await familyMemberService.queryFamily({}, [household.id])

    expect(results.length).toEqual(1)
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

  it('age is smaller than younger than', async () => {
    const results = await familyMemberService.queryFamily({ youngerThan: age + 1 }, [household.id])

    expect(results.length).toEqual(1)
  })

  it('age match younger than', async () => {
    const results = await familyMemberService.queryFamily({ youngerThan: age }, [household.id])

    expect(results.length).toEqual(0)
  })

  it('age is larger than younger than', async () => {
    const results = await familyMemberService.queryFamily({ youngerThan: age - 1 }, [household.id])

    expect(results.length).toEqual(0)
  })

  it('age is smaller than older than', async () => {
    const results = await familyMemberService.queryFamily({ olderThan: age + 1 }, [household.id])

    expect(results.length).toEqual(0)
  })

  it('age match older than', async () => {
    const results = await familyMemberService.queryFamily({ olderThan: age }, [household.id])

    expect(results.length).toEqual(0)
  })

  it('age is larger than older than', async () => {
    const results = await familyMemberService.queryFamily({ olderThan: age - 1 }, [household.id])

    expect(results.length).toEqual(1)
  })

  it('has no couple', async () => {
    const results = await familyMemberService.queryFamily({ hasCouple: 'true' }, [household.id])

    expect(results.length).toEqual(0)
  })

  it('has couple', async () => {
    const couple = mockCoupleData(household.id)
    await FamilyMember.insertMany(couple)
    const results = await familyMemberService.queryFamily({ hasCouple: 'true' }, [household.id])

    expect(results.length).toEqual(1)
  })
})

describe('delete family members by household id', () => {
  it('delete family members with matching household id', async () => {
    const couple = mockCoupleData(mockObjectIdString)
    await FamilyMember.insertMany(couple)

    const results = await familyMemberService.deleteFamilyMembersByHouseholdId(mockObjectId())

    expect(results.deletedCount).toEqual(couple.length)
  })
})
