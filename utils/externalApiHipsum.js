const axios = require('axios');
const config = require('../config');

const parseTasks = require('./tasksUtils');

/**
 * Get from the API the 'sentences' amount of sentences
 * and parse it to get ready for insert them in the database
 * if there is not enough records, get them from the api and store them
 * @param {number} sentences - Filters to the Database
 * @returns {array} - Array of tasks parsed
 *
 */
const get = async (sentences = 3, type = 'hipster-centric') => {
  let tasks;
  const hipsumAPI = axios.create({
    baseURL: config.hipsumAPI,
  });
  try {
    const response = await hipsumAPI.get('/api', {
      params: {
        type,
        sentences,
      },
    });
    tasks = parseTasks(response.data[0]);
  } catch (error) {
    console.error(error);
  }
  return tasks;
};

module.exports = { get };
