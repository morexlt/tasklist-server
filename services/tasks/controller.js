'use-strict';

const Tasks = require('./model');

const getAll = async (req, res, next) => {
  try {
    const tasks = Tasks.getAll;
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Tasks.update(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAll,
  update,
};
