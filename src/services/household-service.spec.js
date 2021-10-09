/* eslint-disable no-underscore-dangle */
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
  const mockRequest = housingType => ({ body: { housingType } })

  it('valid', async () => {
    const housingType = 'HDB'

    const newHousehold = await householdService.addHousehold(mockRequest(housingType))

    expect(newHousehold.housingType).toEqual(housingType)
  })

  it('invalid', async () => {
    expect.assertions(1)
    const housingType = 'ABC'

    try {
      await householdService.addHousehold(mockRequest(housingType))
    } catch (e) {
      expect(e.errors.housingType.message).toEqual(
        'housingType must be one of the following: HDB, Condominium, Landed'
      )
    }
  })
})
