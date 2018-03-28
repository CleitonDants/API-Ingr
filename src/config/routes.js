const express = require('express');
const Database = require('./database');
const mongoose = require('mongoose');

const router = express.Router();

const { ObjectId: Id } = mongoose.Types;

router.get('/', (req, res) => {
  Database.find((err, users) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(users);
  });
});

router.get('/:id', (req, res) => {
  Database.findById(
    req.params.id,
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(user);
    },
  );
});

router.post('/', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    tickets: req.body.tickets,
  };

  const userModeled = new Database(newUser);

  userModeled.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(userModeled);
  });
});

router.put('/:id', (req, res) => {
  const query = req.params.id;
  const newData = req.body;

  Database.findByIdAndUpdate(
    query,
    newData, {
      new: true,
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.send(user);
    },
  );
});

router.delete('/:id', (req, res) => {
  Database.findByIdAndRemove(
    req.params.id,
    (err, user) => {
      if (err) return res.status(500).send(err);

      const response = {
        message: 'Successfully deleted',
        user,
      };
      return res.status(200).send(response);
    },
  );
});

router.put('/:id', (req, res) => {
  const newTicket = {
    _id: new Id(),
    eventName: req.body.eventName,
    local: req.body.local,
    date: req.body.date,
    usdPrice: req.body.usdPrice,
  };

  Database.findByIdAndUpdate(
    req.params.id, {
      $push: {
        tickets: newTicket,
      },
    }, {
      new: true,
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.send(user);
    },
  );
});

module.exports = router;
