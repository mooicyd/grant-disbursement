const db = require('../test/db')
const householdService = require('./household-service')
const FamilyMember = require('../models/family-member-model')

beforeAll(async () => {
  await db.setup()
})

beforeEach(async () => {
  await db.reset()
})

afterAll(async () => {
  await db.teardown()
})

const addFamilyMember = async () => {
  const newFamilyMember = new FamilyMember({
    name: 'Dex',
    gender: 'Male',
    maritalStatus: 'Single',
    spouse: '',
    occupationType: 'Employed',
    annualIncome: 1,
    dob: '1990-01-01'
  })
  return newFamilyMember.save()
}

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
  it('household exists', async () => {
    const newHousehold = await householdService.addHousehold({ housingType: 'HDB' })

    const result = await householdService.getHouseholdById(newHousehold.id)

    expect(result.toJSON()).toEqual(newHousehold.toJSON())
  })

  it('household not exists', async () => {
    const result = await householdService.getHouseholdById('6162368212490dc38a9fe196')

    expect(result).toBeFalsy()
  })
})

describe('update household', () => {
  it('insert family member id to familyMembers', async () => {
    const household = await householdService.addHousehold({ housingType: 'HDB' })
    const newFamilyMember = await addFamilyMember()

    const result = await householdService.updateHousehold(household.id, newFamilyMember.id)

    expect(result.familyMembers[0].toString()).toEqual(newFamilyMember.id)
  })
})

describe('list households', () => {
  it('no households', async () => {
    const result = await householdService.listHouseholds()

    expect(result).toEqual([])
  })

  it('with empty household', async () => {
    await householdService.addHousehold({ housingType: 'HDB' })

    const result = await householdService.listHouseholds()

    expect(result.length).toEqual(1)
    expect(result[0].familyMembers).toEqual([])
  })

  it('household with people', async () => {
    const newHousehold = await householdService.addHousehold({ housingType: 'HDB' })
    const newFamilyMember = await addFamilyMember()
    await householdService.updateHousehold(newHousehold.id, newFamilyMember.id)

    const result = await householdService.listHouseholds(newHousehold.id)

    expect(result[0].familyMembers.length).toEqual(1)
    expect(result[0].familyMembers[0].toJSON()).toEqual(newFamilyMember.toJSON())
  })
})
