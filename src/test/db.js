/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer
let uri
const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const setup = async () => {
  mongoServer = await MongoMemoryServer.create()
  uri = mongoServer.getUri()
  await mongoose.connect(uri, mongooseOpts)
}

const reset = async () => {
  Object.values(mongoose.connection.collections).forEach(async collection => {
    await collection.deleteMany()
  })
}

const teardown = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}

module.exports = { setup, reset, teardown }
