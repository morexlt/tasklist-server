'use-strict';

const express = require('express');
const tasks = require('./services/tasks/routes');
const config = require('./config');

const app = express();

app.use('/tasks', tasks);

app.listen(config.port, () => {
  console.log(`Tasklist backend listening on port ${config.port}!`);
});
