/* eslint-disable import/no-extraneous-dependencies */
const { getObjectId, getObjectIds } = require('mongo-seeding')

const households = [
  {
    id: getObjectId('household1'),
    housingType: 'HDB',
    familyMembers: getObjectIds(['Alex', 'Alexa'])
  },
  {
    id: getObjectId('household2'),
    housingType: 'Landed',
    familyMembers: getObjectIds(['Rich'])
  },
  {
    id: getObjectId('household3'),
    housingType: 'Landed',
    familyMembers: getObjectIds(['Rich Old'])
  },
  {
    id: getObjectId('household4'),
    housingType: 'Condominium',
    familyMembers: getObjectIds(['Kelvin', 'Lydia', 'Jack'])
  },
  {
    id: getObjectId('household5'),
    housingType: 'HDB',
    familyMembers: getObjectIds(['Dean', 'May', 'Ah Gong'])
  },
  {
    id: getObjectId('household6'),
    housingType: 'HDB',
    familyMembers: getObjectIds(['Dickson', 'Alexandra', 'Childe'])
  },
  {
    id: getObjectId('household7'),
    housingType: 'HDB',
    familyMembers: getObjectIds(['Ah Ma', 'Jean'])
  }
]

module.exports = households
