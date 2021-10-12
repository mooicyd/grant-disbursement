/* eslint-disable import/no-extraneous-dependencies */
require('dotenv/config')
const { Seeder } = require('mongo-seeding')
const path = require('path')

const config = {
  dropDatabase: true,
  database: process.env.GRANTS_MONGO_URI
}

const seeder = new Seeder(config)

const collections = seeder.readCollectionsFromPath(path.resolve('./src/seeds/data'), {
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
})

seeder
  .import(collections)
  .then(() => {
    console.log('Success')
  })
  .catch(e => {
    console.log('Error:', e)
  })
