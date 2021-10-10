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

const mockRequest = housingType => ({ body: { housingType } })

describe('add household', () => {
  it('valid', async () => {
    const housingType = 'HDB'

    const result = await grantsController.addHousehold(mockRequest(housingType))

    expect(result).toMatchObject({ id: result.id, familyMembers: [], housingType })
  })
})

describe('get household by id', () => {
  it('valid', async () => {
    const housingType = 'HDB'

    const newHousehold = await grantsController.addHousehold(mockRequest(housingType))
    const household = await grantsController.getHouseholdById({ params: { id: newHousehold.id } })

    expect(household).toBeTruthy()
  })

  it('household not found', async () => {
    const household = await grantsController.getHouseholdById({
      params: { id: '6162368212490dc38a9fe196' }
    })

    expect(household).toBeFalsy()
  })
})
