'use-strict';

const { Connection } = require('../database/mongodb');
const { ErrorHandler } = require('../helpers/error');

const getCollection = () => Connection.db.collection('tasks');

/**
 * Find all tasks from the Database
 * @param {object} filters - Filters for the query
 * @returns {Array} - A array of tasks
 *
 */
const findAll = async (filters) => {
  let allTasks;
  const limit = parseInt(filters.limit, 10) || 3;
  try {
    const tasksCollection = getCollection();
    allTasks = await tasksCollection.find().limit(limit).toArray();
  } catch (error) {
    console.error('Error findAll task respository');
    console.error(error);
    throw new ErrorHandler(500, 'There is a Problem with the Database');
  }
  return allTasks;
};

/**
 * Update a task
 * @param {object} uuid - uuid from the task to update
 * @param {object} data - The data to update
 * @returns {object} - The updated task
 *
 */
const update = async (uuid, data) => {
  let updatedTask;
  try {
    const tasksCollection = getCollection();
    const result = await tasksCollection.findOneAndUpdate(
      { uuid },
      {
        $set: data,
      },
      { returnOriginal: false },
    );
    updatedTask = result.value;
  } catch (error) {
    console.error('Error update task respository');
    console.error(error);
    throw new ErrorHandler(500, 'There is a Problem updating the task');
  }
  return updatedTask;
};

/**
 * Insert a Array to de Database
 * @param {Array} tasks - Tasks to insert
 * @returns {Array} - A array of tasks inserted
 *
 */
const bulkInsert = async (tasks) => {
  let insertedObjects;
  try {
    const tasksCollection = getCollection();
    const insertResult = await tasksCollection.insertMany(tasks);
    insertedObjects = insertResult.ops;
  } catch (error) {
    console.error('Error bulkInsert task respository');
    console.error(error);
    throw new ErrorHandler(500, 'There is a Problem inserting all the records');
  }
  return insertedObjects;
};

module.exports = {
  findAll,
  update,
  bulkInsert,
};
