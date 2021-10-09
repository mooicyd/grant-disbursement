/* eslint-disable no-underscore-dangle */
const db = require('../test/db')
const householdController = require('./household-controller')

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

    const newHousehold = await householdController.addHousehold({ body: { housingType } })

    expect(newHousehold.housingType).toEqual(housingType)
  })

  it('invalid', async () => {
    const housingType = 'ABC'
    try {
      await householdController.addHousehold({ body: { housingType } })
    } catch (e) {
      expect(e.errors.housingType.message).toEqual(
        'housingType must be one of the following: HDB, Condominium, Landed'
      )
    }
  })
})
