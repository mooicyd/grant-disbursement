const mongoose = require('mongoose')
const TestDb = require('../test/db')
const householdService = require('./household-service')
const FamilyMember = require('../models/family-member-model')
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

describe('query households', () => {
  beforeEach(async () => {
    await Household.insertMany([
      { housingType: 'HDB' },
      { housingType: 'Condominium' },
      { housingType: 'HDB' },
      { housingType: 'Landed' },
      { housingType: 'Condominium' },
      { housingType: 'HDB' }
    ])
  })
  it('no query returns all household ids', async () => {
    const householdIds = await householdService.queryHouseholds({})

    expect(householdIds.length).toEqual(6)
    expect(householdIds[0]).toBeInstanceOf(mongoose.Types.ObjectId)
  })

  it('query housing type returns household ids that match', async () => {
    const householdIds = await householdService.queryHouseholds({ housingType: 'HDB' })
    expect(householdIds.length).toEqual(3)
  })

  it('query family size returns household ids that match size', async () => {
    const householdIds = await householdService.queryHouseholds({ familySize: 2 })
    expect(householdIds.length).toEqual(0)
  })
})

describe('get households by ids', () => {
  beforeEach(async () => {
    await Household.insertMany([
      { housingType: 'HDB' },
      { housingType: 'Condominium' },
      { housingType: 'HDB' },
      { housingType: 'Landed' },
      { housingType: 'Condominium' },
      { housingType: 'HDB' }
    ])
  })
  it('valid ids', async () => {
    const householdIds = await householdService.queryHouseholds({ housingType: 'HDB' })

    const result = await householdService.getHouseholdsByIds(householdIds)

    expect(result.length).toEqual(3)
    expect(result[0]._id).toEqual(householdIds[0])
    expect(result[1]._id).toEqual(householdIds[1])
    expect(result[2]._id).toEqual(householdIds[2])
  })

  it('ignore invalid ids', async () => {
    const householdIds = await householdService.queryHouseholds({ housingType: 'HDB' })
    householdIds.push(mongoose.Types.ObjectId('6162368212490dc38a9fe196'))

    const result = await householdService.getHouseholdsByIds(householdIds)

    expect(result.length).toEqual(3)
  })
})
