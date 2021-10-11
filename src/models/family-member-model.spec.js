const TestDb = require('../test/db')
const mocks = require('../test/mocks')
const FamilyMember = require('./family-member-model')

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

const getFieldErrorMessage = (e, field) => e.errors[field].message

it('valid family member', async () => {
  const familyMember = mocks.mockFamilyMemberData()
  const newFamilyMember = new FamilyMember(familyMember)

  const result = await newFamilyMember.save()

  expect(result.name).toEqual(familyMember.name)
  expect(result.gender).toEqual(familyMember.gender)
  expect(result.maritalStatus).toEqual(familyMember.maritalStatus)
  expect(result.spouse).toEqual(familyMember.spouse)
  expect(result.occupationType).toEqual(familyMember.occupationType)
  expect(result.annualIncome).toEqual(familyMember.annualIncome)
  expect(result.dob).toEqual(new Date(familyMember.dob))
})

it.each`
  field
  ${'name'}
  ${'gender'}
  ${'dob'}
`('missing field', async ({ field }) => {
  expect.assertions(1)
  const familyMember = mocks.mockFamilyMemberData()
  familyMember[field] = ''
  const newFamilyMember = new FamilyMember(familyMember)

  try {
    await newFamilyMember.save()
  } catch (e) {
    expect(e.errors[field].message).toEqual(`${field} is required`)
  }
})

it('invalid gender', async () => {
  expect.assertions(1)
  const familyMember = mocks.mockFamilyMemberData()
  familyMember.gender = 'M'
  const newFamilyMember = new FamilyMember(familyMember)

  try {
    await newFamilyMember.save()
  } catch (e) {
    expect(getFieldErrorMessage(e, 'gender')).toEqual(
      'gender must be one of the following: Male, Female'
    )
  }
})

it('invalid occupation type', async () => {
  expect.assertions(1)
  const familyMember = mocks.mockFamilyMemberData()
  familyMember.occupationType = 'notexists'
  const newFamilyMember = new FamilyMember(familyMember)

  try {
    await newFamilyMember.save()
  } catch (e) {
    expect(getFieldErrorMessage(e, 'occupationType')).toEqual(
      'occupationType must be one of the following: Unemployed, Student, Employed'
    )
  }
})

it('invalid annualIncome', async () => {
  expect.assertions(1)
  const familyMember = mocks.mockFamilyMemberData()
  familyMember.annualIncome = -1
  const newFamilyMember = new FamilyMember(familyMember)

  try {
    await newFamilyMember.save()
  } catch (e) {
    expect(getFieldErrorMessage(e, 'annualIncome')).toEqual('annualIncome cannot be less than 0')
  }
})
