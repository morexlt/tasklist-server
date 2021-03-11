const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { Connection } = require('../database/mongodb');

const server = require('../index');

chai.use(chaiHttp);

describe('Tasks', async () => {
  before(async () => {
    await Connection.connect();
    const collectionTasks = Connection.db.collection('tasks');
    await collectionTasks.deleteMany({});
  });

  describe('/GET tasks', () => {
    it('it should GET 3 tasks in a array (default)', (done) => {
      chai
        .request(server)
        .get('/tasks')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a('array');
          expect(res.body).to.have.lengthOf(3);
          done();
        });
    });
    it('it should GET the same tasks (idempotency)', (done) => {
      let task;
      chai
        .request(server)
        .get('/tasks')
        .query({
          limit: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a('array');
          expect(res.body).to.have.lengthOf(1);
          [task] = res.body;

          chai
            .request(server)
            .get('/tasks')
            .query({
              limit: 4,
            })
            .end((error, result) => {
              expect(result).to.have.status(200);
              expect(result.body).be.a('array');
              expect(result.body).to.have.lengthOf(4);
              expect(result.body[0].uuid).to.be.equals(task.uuid);
              expect(result.body[0].title).to.be.equals(task.title);
              done();
            });
        });
    });
    it('it should GET 3 tasks with limit 0 (default)', (done) => {
      chai
        .request(server)
        .get('/tasks')
        .query({
          limit: 0,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a('array');
          expect(res.body).to.have.lengthOf(3);
          done();
        });
    });
  });
  describe('/PUT tasks', () => {
    it('it should GET modified status after PUT', (done) => {
      let task;
      chai
        .request(server)
        .get('/tasks')
        .query({
          limit: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a('array');
          expect(res.body).to.have.lengthOf(1);
          [task] = res.body;
          chai
            .request(server)
            .put(`/tasks/${task.uuid}`)
            .send({
              done: false,
            })
            .end((error, result) => {
              expect(result).to.have.status(204);
              chai
                .request(server)
                .get('/tasks')
                .query({
                  limit: 1,
                })
                .end((finalError, finalResult) => {
                  expect(finalResult).to.have.status(200);
                  expect(finalResult.body).be.a('array');
                  expect(finalResult.body).to.have.lengthOf(1);
                  expect(finalResult.body[0].done).to.be.equals(false);
                  done();
                });
            });
        });
    });
    it('it should GET same status after PUT with same values', (done) => {
      let task;
      chai
        .request(server)
        .get('/tasks')
        .query({
          limit: 1,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a('array');
          expect(res.body).to.have.lengthOf(1);
          [task] = res.body;
          chai
            .request(server)
            .put(`/tasks/${task.uuid}`)
            .send({
              done: false,
            })
            .end((error, result) => {
              expect(result).to.have.status(204);
              chai
                .request(server)
                .get('/tasks')
                .query({
                  limit: 1,
                })
                .end((finalError, finalResult) => {
                  expect(finalResult).to.have.status(200);
                  expect(finalResult.body).be.a('array');
                  expect(finalResult.body).to.have.lengthOf(1);
                  expect(finalResult.body[0].done).to.be.equals(false);
                  done();
                });
            });
        });
    });
  });
});
