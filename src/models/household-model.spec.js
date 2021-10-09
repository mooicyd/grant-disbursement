/* eslint-disable no-underscore-dangle */
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
