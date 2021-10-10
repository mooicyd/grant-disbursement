const db = require('../test/db')
const householdService = require('./household-service')

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
    const result = await householdService.getHouseholdById(newHousehold._id.toString())

    expect(result.toJSON()).toEqual(newHousehold.toJSON())
  })

  it('household not exists', async () => {
    const result = await householdService.getHouseholdById('6162368212490dc38a9fe196')

    expect(result).toBeFalsy()
  })
})
