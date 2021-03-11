'use-strict';

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const tasks = require('./services/tasks/routes');
const config = require('./config');
const { Connection } = require('./database/mongodb');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors({ origin: config.allowedOrigins }));

app.use('/tasks', tasks);

app.listen(config.port, async () => {
  try {
    await Connection.connect();
    console.log(`Tasklist backend listening on port ${config.port}!`);
  } catch (error) {
    console.error(error);
    throw new Error('Cannot connect with the database');
  }
});
