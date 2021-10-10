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

describe('add family member to household', () => {
  let household
  beforeEach(async () => {
    household = await grantsController.addHousehold(mockRequest({ housingType: 'HDB' }))
  })

  it('valid', async () => {
    const familyMemberInfo = {
      name: 'Dex',
      gender: 'Male',
      maritalStatus: 'Single',
      spouse: '',
      occupationType: 'Employed',
      annualIncome: 1,
      dob: '1990-01-01'
    }
    const expected = {
      id: expect.any(String),
      ...familyMemberInfo,
      dob: new Date(familyMemberInfo.dob)
    }

    const result = await grantsController.addFamilyMember(
      mockRequest(familyMemberInfo, household.id)
    )

    expect(result).toMatchObject(expected)
  })

  it('household not found', async () => {
    expect.assertions(1)
    try {
      await grantsController.addFamilyMember(
        mockRequest(expect.anything(), '6162368212490dc38a9fe196')
      )
    } catch (e) {
      expect(e.message).toBe('Household not found')
    }
  })
})
