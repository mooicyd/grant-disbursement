const mongoose = require('mongoose')
const TestDb = require('../test/db')
const mocks = require('../test/mocks')
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
  const newFamilyMember = new FamilyMember(mocks.mockFamilyMemberData())
  return newFamilyMember.save()
}

const setupHouseholds = async () => {
  await Household.insertMany([
    { housingType: 'HDB' },
    { housingType: 'Condominium' },
    { housingType: 'HDB' },
    { housingType: 'Landed' },
    { housingType: 'Condominium' },
    { housingType: 'HDB' }
  ])
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

describe('get household by id', () => {
  it('household exists', async () => {
    const newHousehold = await householdService.addHousehold({ housingType: 'HDB' })

    const result = await householdService.getHouseholdById(newHousehold.id)

    expect(result.toJSON()).toEqual(newHousehold.toJSON())
  })

  it('household not exists', async () => {
    const result = await householdService.getHouseholdById('6162368212490dc38a9fe196')

    expect(result).toBeFalsy()
  })

  it('display family member', async () => {
    const household = await householdService.addHousehold({ housingType: 'HDB' })
    const newFamilyMember = await addFamilyMember()
    await householdService.updateHousehold(household.id, newFamilyMember.id)

    const result = await householdService.getHouseholdById(household.id)

    expect(result.familyMembers[0].toJSON()).toEqual(newFamilyMember.toJSON())
  })
})

describe('update household', () => {
  it('insert family member id to familyMembers', async () => {
    const household = await householdService.addHousehold({ housingType: 'HDB' })
    const newFamilyMember = await addFamilyMember()

    await householdService.updateHousehold(household.id, newFamilyMember.id)

    const result = await Household.findById(household.id)

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
    await setupHouseholds()
  })
  it('no query', async () => {
    const householdIds = await householdService.queryHouseholds({})

    expect(householdIds.length).toEqual(6)
    expect(householdIds[0]).toBeInstanceOf(mongoose.Types.ObjectId)
  })

  it('match housing type', async () => {
    const householdIds = await householdService.queryHouseholds({ housingType: 'HDB' })
    expect(householdIds.length).toEqual(3)
  })

  it('match family', async () => {
    const householdIds = await householdService.queryHouseholds({ familySize: 2 })
    expect(householdIds.length).toEqual(0)
  })

  it('match all conditions', async () => {
    const householdIds = await householdService.queryHouseholds({
      housingType: 'Landed',
      familySize: 0
    })
    expect(householdIds.length).toEqual(1)
  })
})

describe('get households by ids', () => {
  beforeEach(async () => {
    await setupHouseholds()
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
