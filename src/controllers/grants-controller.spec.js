const db = require('../test/db')
const grantsController = require('./grants-controller')

beforeAll(async () => {
  await db.setup()
})

beforeEach(async () => {
  await db.reset()
})

afterAll(async () => {
  await db.teardown()
})

const mockRequest = (body, id) => ({ params: { id }, body })
const fakeObjectId = '6162368212490dc38a9fe196'

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
      mockRequest(expect.anything(), fakeObjectId)
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
    const familyMemberInfo = {
      name: 'Dex',
      gender: 'Male',
      maritalStatus: 'Single',
      spouse: '',
      occupationType: 'Employed',
      annualIncome: 1,
      dob: '1990-01-01'
    }

    const result = await grantsController.addFamilyMemberToHousehold(
      mockRequest(familyMemberInfo, household.id)
    )

    expect(result.householdId.toString()).toEqual(household.id)
  })

  it('household not found', async () => {
    expect.assertions(1)
    try {
      await grantsController.addFamilyMemberToHousehold(
        mockRequest(expect.anything(), fakeObjectId)
      )
    } catch (e) {
      expect(e.message).toBe('Household not found')
    }
  })
})

it('list households', async () => {
  const households = await grantsController.listHouseholds()
  expect(households).toEqual([])
})
