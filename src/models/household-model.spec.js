const db = require('../test/db')
const Household = require('./household-model')

beforeAll(async () => {
  await db.setup()
})

afterEach(async () => {
  await db.reset()
})

afterAll(async () => {
  await db.teardown()
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
