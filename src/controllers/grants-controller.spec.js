/* eslint-disable no-underscore-dangle */
const db = require('../test/db')
const grantsController = require('./grants-controller')

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

    const result = await grantsController.addHousehold(mockRequest(housingType))

    expect(result).toEqual({ _id: result._id, housingType, familyMembers: [] })
  })
})