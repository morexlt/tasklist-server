'use-strict';

const Tasks = require('./model');

const getAll = async (req, res, next) => {
  const { limit } = req.query;
  try {
    const tasks = await Tasks.getAll({ limit });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getAll task controller');
    console.error(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await Tasks.update(id, data);
    res.status(204).send();
  } catch (error) {
    console.error('Error update task controller');
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAll,
  update,
};
