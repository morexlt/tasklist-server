'use-strict';

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const tasks = require('./services/tasks/routes');
const config = require('./config');
const { Connection } = require('./database/mongodb');
const { handleError } = require('./helpers/error');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors({ origin: config.allowedOrigins }));

app.use('/tasks', tasks);

app.use(handleError);

module.exports = app.listen(config.port, async () => {
  try {
    await Connection.connect();
    console.log(`Tasklist backend listening on port ${config.port}!`);
  } catch (error) {
    console.error(error);
    throw new Error('Cannot connect with the database');
  }
});
