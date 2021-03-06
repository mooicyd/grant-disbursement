const TestDb = require('../test/db')
const Household = require('./household-model')

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

const housingTypeErrorMsg = e => e.errors.housingType.message

it.each`
  housingType
  ${'HDB'}
  ${'Condominium'}
  ${'Landed'}
`('valid housing type', async ({ housingType }) => {
  const household = new Household({ housingType })

  const result = await household.save()

  expect(result.housingType).toEqual(housingType)
  expect(result.familyMembers).toEqual([])
})

it('missing housingType', async () => {
  expect.assertions(1)
  const household = new Household()

  try {
    await household.save()
  } catch (e) {
    expect(housingTypeErrorMsg(e)).toEqual('housingType is required')
  }
})

it('invalid housingType', async () => {
  expect.assertions(1)
  const household = new Household({ housingType: 'notexists' })

  try {
    await household.save()
  } catch (e) {
    expect(housingTypeErrorMsg(e)).toEqual(
      'housingType must be one of the following: HDB, Condominium, Landed'
    )
  }
})
