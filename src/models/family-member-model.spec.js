const db = require('../test/db')
const FamilyMember = require('./family-member-model')

beforeAll(async () => {
  await db.setup()
})

beforeEach(async () => {
  await db.reset()
})

afterAll(async () => {
  await db.teardown()
})

const mockFamilyMember = () => ({
  name: 'Dex',
  gender: 'Male',
  maritalStatus: 'Single',
  spouse: '',
  occupationType: 'Employed',
  annualIncome: 1,
  dob: '1990-01-01'
})

const getFieldErrorMessage = (e, field) => e.errors[field].message

it('valid family member', async () => {
  const familyMember = mockFamilyMember()
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
  const familyMember = mockFamilyMember()
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
  const familyMember = mockFamilyMember()
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
  const familyMember = mockFamilyMember()
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
  const familyMember = mockFamilyMember()
  familyMember.annualIncome = -1
  const newFamilyMember = new FamilyMember(familyMember)

  try {
    await newFamilyMember.save()
  } catch (e) {
    expect(getFieldErrorMessage(e, 'annualIncome')).toEqual('annualIncome cannot be less than 0')
  }
})
