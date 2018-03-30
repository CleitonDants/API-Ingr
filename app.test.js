const test = require('tape');
const supertest = require('supertest');
const app = require('../app');
const docJson = require('./docJson');
const mongoose = require('mongoose');

let idUser = '';

function dropDB() {
  mongoose.connection.db.dropCollection('ingr_users');
}

test('Init database:', {timeout: 10000}, (t) => {
  mongoose.connection
    .on('open', () => {
      t.comment('Database connection established');
      dropDB();
      t.end();
    });
});

test('========== POST api/v1/user ==========', (t) => {
  supertest(app)
    .post('/api/v1/user/')
    .send(docJson)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error returned');
      t.assert(res.body.name === docJson.name, 'Name inserted!');
      t.assert(res.body.idade === docJson.idade, 'Age inserted!');
      t.assert(res.body.email === docJson.email, 'Email inserted!');
      t.end();
    });
});

test('========== GET api/v1/user ==========', (t) => {
  supertest(app)
    .get('/api/v1/user/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error returned');
      idUser = res.body[0]._id;
      t.assert(res.body[0].name === docJson.name, 'Name catched!');
      t.assert(res.body[0].idade === docJson.idade, 'Age catched!');
      t.assert(res.body[0].email === docJson.email, 'Email catched!');

      t.assert(res.body[0].tickets[0].eventName === docJson.tickets[0].eventName, 'Ticket 1 eventName catched!');
      t.assert(res.body[0].tickets[0].local === docJson.tickets[0].local, 'Ticket 1 local catched!');
      t.assert(res.body[0].tickets[0].date === docJson.tickets[0].date, 'Ticket 1 date catched!');
      t.assert(res.body[0].tickets[0].price === docJson.tickets[0].price, 'Ticket 1 price catched!');

      t.assert(res.body[0].tickets[1].eventName === docJson.tickets[1].eventName, 'Ticket 2 eventName catched!');
      t.assert(res.body[0].tickets[1].local === docJson.tickets[1].local, 'Ticket 2 local catched!');
      t.assert(res.body[0].tickets[1].date === docJson.tickets[1].date, 'Ticket 2 date catched!');
      t.assert(res.body[0].tickets[1].price === docJson.tickets[1].price, 'Ticket 2 price catched!');
      t.end();
    });
});

test('========== GET by id api/v1/user:id ==========', (t) => {
  supertest(app)
    .get(`/api/v1/user/${idUser}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error returned');
      t.assert(res.body.name === docJson.name, 'Name catched!');
      t.assert(res.body.idade === docJson.idade, 'Age catched!');
      t.assert(res.body.email === docJson.email, 'Email catched!');
      t.end();
    });
});

test('========== PUT api/v1/user/:id ==========', (t) => {
  supertest(app)
    .put(`/api/v1/user/${idUser}`)
    .send({
      "name": "Cleiton",
      "email": "cleitondantas@usp.br"
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error returned');
      t.assert(res.body.name === "Cleiton", 'Name changed!');
      t.assert(res.body.email === "cleitondantas@usp.br", 'Email changed!');
      t.end();
    });
});

test('========== DELETE api/v1/user/:id ==========', (t) => {
  supertest(app)
    .delete(`/api/v1/user/${idUser}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error returned');
      t.assert(res.body.message === "Successfully deleted", "Deleted!");
    });
  
  supertest(app)
    .get(`/api/v1/user/${idUser}`)
    .expect(200)
    .end((err, res) => {
      t.comment("Trying get any field: ");
      t.error(err, 'No error returned');
      t.assert(res.body.name === undefined, 'Name not found!');
      t.assert(res.body.idade === undefined, 'Age not found!');
      t.assert(res.body.email === undefined, 'Email not found!');
      t.end();
    });
});

test('Disconnect database:', (t) => {
  mongoose.connection.close(() => {
    t.comment('Database connection closed');
    t.end();
  });
});
