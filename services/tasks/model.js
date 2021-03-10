'use-strict';

const tasksRepository = require('../../repositories/tasks');
const hipsumAPI = require('../../utils/externalApiHipsum');

/**
 * Get from the API 'quantity' records and store them in the Database
 * @param {number} quantity - Tasks to fetch
 * @returns {array} - Array of tasks inserted in the Database
 *
 */
const getAndStore = async (quantity) => {
  const tasksFetched = await hipsumAPI.get(quantity);
  const newTasks = await tasksRepository.bulkInsert(tasksFetched);
  return newTasks;
};

/**
 * Get from the Database the 'limit' amount of tasks
 * if there is not enough records, get them from the api and store them
 * @param {number} filters - Filters to the Database
 * @returns {array} - Array of tasks
 *
 */
const getAll = async (filters) => {
  let allTasks = await tasksRepository.findAll(filters);
  if (allTasks.length === 0) {
    allTasks = await getAndStore(filters.limit);
  } else if (allTasks.length < filters.limit) {
    const difference = filters.limit - allTasks.length;
    const newTasks = await getAndStore(difference);
    allTasks = allTasks.concat(newTasks);
  }
  return allTasks;
};

/**
 * Update one task
 * @param {uuid} uuid - Uuid from the task
 * @param {object} data - Data to update
 *
 */
const update = async (uuid, data) => {
  console.log(`update task ${uuid}`);
  await tasksRepository.update(uuid, data);
};

module.exports = {
  getAll,
  update,
};
