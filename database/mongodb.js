'use-strict';

const { MongoClient } = require('mongodb');
const config = require('../config');

/**
 * Provides a singleton object to get the active connection to the Database
 * @returns {object} - A connection object to the Database
 *
 */
class Connection {
  static async connect() {
    if (this.db) return this.db;
    try {
      const client = await MongoClient.connect(this.url, this.options);
      const db = client.db(this.dbName);
      this.db = db;

      this.db
        .listCollections({ name: 'tasks' })
        .next(async (err, collection) => {
          if (err) {
            throw new Error(
              'There is a problem with de Database',
            );
          }
          if (!collection) {
            try {
              await db.createCollection('timezones');
            } catch (error) {
              console.error('The collection already exist');
            }
          }
        });
    } catch (error) {
      console.error(error);
      throw new Error('Error when trying to connect with DB');
    }
    return this.db;
  }
}

Connection.db = null;
Connection.url = `mongodb://${config.mongodbUrl}:${config.mongodbPort}`;
Connection.dbName = config.mongodbDatabaseName;
Connection.options = {
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { Connection };
