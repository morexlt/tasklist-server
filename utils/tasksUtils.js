'use-strict';

const { v4: uuid } = require('uuid');

/**
 * Parse tasks from a paragraph and add uuid
 * @param {array} tasks - Tasks to parse
 * @returns {array} - Array of tasks parsed
 *
 */
const parseTasks = (tasks) => {
  let splitedTasks = [];
  if (tasks) {
    splitedTasks = tasks.split('. ');
  }
  splitedTasks = splitedTasks.map((task) => ({
    title: task,
    done: false,
    uuid: uuid(),
  }));

  return splitedTasks;
};

module.exports = parseTasks;
