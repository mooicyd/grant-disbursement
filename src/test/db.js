/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
class TestDb {
  constructor() {
    this.mongoServer = null
    this.mongoose = mongoose
  }

  async setup() {
    this.mongoServer = await MongoMemoryServer.create()
    await this.mongoose.connect(this.mongoServer.getUri(), mongooseOpts)
  }

  async reset() {
    Object.values(this.mongoose.connection.collections).forEach(async collection => {
      await collection.deleteMany()
    })
  }

  async teardown() {
    await this.mongoose.connection.dropDatabase()
    await this.mongoose.connection.close()
    await this.mongoServer.stop()
  }
}

module.exports = TestDb
