const TestDb = require('../test/db')
const { mockFamilyMemberData, mockObjectIdString } = require('../test/mocks')
const grantsController = require('./grants-controller')

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

const mockRequest = (body, id) => ({ params: { id }, body })

describe('add household', () => {
  it('valid', async () => {
    const housingType = 'HDB'

    const result = await grantsController.addHousehold(mockRequest({ housingType }))

    expect(result).toMatchObject({ id: result.id, familyMembers: [], housingType })
  })
})

describe('get household by id', () => {
  it('valid', async () => {
    const housingType = 'HDB'
    const newHousehold = await grantsController.addHousehold(mockRequest({ housingType }))

    const household = await grantsController.getHouseholdById(
      mockRequest(expect.anything(), newHousehold.id)
    )

    expect(household).toBeTruthy()
  })

  it('household not found', async () => {
    const household = await grantsController.getHouseholdById(
      mockRequest(expect.anything(), mockObjectIdString)
    )

    expect(household).toBeFalsy()
  })
})

describe('add family member to household', () => {
  let household
  beforeEach(async () => {
    household = await grantsController.addHousehold(mockRequest({ housingType: 'HDB' }))
  })

  it('save reference id', async () => {
    const result = await grantsController.addFamilyMemberToHousehold(
      mockRequest(mockFamilyMemberData(), household.id)
    )

    expect(result.householdId.toString()).toEqual(household.id)
  })

  it('household not found', async () => {
    expect.assertions(1)
    try {
      await grantsController.addFamilyMemberToHousehold(
        mockRequest(expect.anything(), mockObjectIdString)
      )
    } catch (e) {
      expect(e.message).toBe('Household not found')
    }
  })
})

it('list households', async () => {
  const households = await grantsController.listHouseholds()
  expect(households).toBeInstanceOf(Array)
})

describe('delete household', () => {
  it('missing id', async () => {
    expect.assertions(1)
    try {
      await grantsController.deleteHousehold({ params: {} })
    } catch (e) {
      expect(e.message).toEqual('Household ID must be specified')
    }
  })

  it('delete existing household', async () => {
    const household = await grantsController.addHousehold(mockRequest({ housingType: 'HDB' }))

    const result = await grantsController.deleteHousehold(
      mockRequest(expect.anything(), household.id)
    )

    expect(result).toEqual('Household deleted')
  })

  it('already deleted household', async () => {
    const result = await grantsController.deleteHousehold({ params: { id: mockObjectIdString } })

    expect(result).toEqual('Household deleted')
  })
})
