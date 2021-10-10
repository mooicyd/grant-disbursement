const db = require('../test/db')
const householdService = require('./household-service')
const FamilyMember = require('../models/family-member-model')

beforeAll(async () => {
  await db.setup()
})

afterEach(async () => {
  await db.reset()
})

afterAll(async () => {
  await db.teardown()
})

describe('add household', () => {
  it('valid', async () => {
    const housingType = 'HDB'

    const newHousehold = await householdService.addHousehold({ housingType })

    expect(newHousehold).toBeTruthy()
  })

  it('invalid', async () => {
    expect.assertions(1)
    const housingType = 'ABC'

    try {
      await householdService.addHousehold({ housingType })
    } catch (e) {
      expect(e.errors.housingType.message).toEqual(
        'housingType must be one of the following: HDB, Condominium, Landed'
      )
    }
  })
})

describe('find household', () => {
  let newHousehold

  beforeEach(async () => {
    newHousehold = await householdService.addHousehold({ housingType: 'HDB' })
  })

  it('household exists', async () => {
    const result = await householdService.getHouseholdById(newHousehold.id)

    expect(result.toJSON()).toEqual(newHousehold.toJSON())
  })

  it('household not exists', async () => {
    const result = await householdService.getHouseholdById('6162368212490dc38a9fe196')

    expect(result).toBeFalsy()
  })
})

describe('update household', () => {
  let household
  let newFamilyMember

  beforeEach(async () => {
    household = await householdService.addHousehold({ housingType: 'HDB' })
    newFamilyMember = new FamilyMember({
      name: 'Dex',
      gender: 'Male',
      maritalStatus: 'Single',
      spouse: '',
      occupationType: 'Employed',
      annualIncome: 1,
      dob: '1990-01-01'
    })
    await newFamilyMember.save()
  })

  it('insert family member id to familyMembers', async () => {
    const result = await householdService.updateHousehold(household.id, newFamilyMember.id)

    expect(result.familyMembers[0].toString()).toEqual(newFamilyMember.id)
  })
})
