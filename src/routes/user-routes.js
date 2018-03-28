const express = require('express');
const UserModel = require('../models/user');
const mongoose = require('mongoose');
const { ticketsHandler } = require('./utils');

const router = express.Router();
const { ObjectId: Id } = mongoose.Types;

// GET all users
router.get('/', (req, res) => {
  UserModel.find((err, users) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(users);
  });
});

// GET user by id
router.get('/:id', (req, res) => {
  UserModel.findById(
    req.params.id,
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(user);
    },
  );
});

// INSERT user
router.post('/', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    tickets: ticketsHandler(req.body.tickets),
  };

  const userModeled = new UserModel(newUser);

  userModeled.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(userModeled);
  });
});

// UPDATE user by given Id
router.put('/:id', (req, res) => {
  const query = req.params.id;
  const newData = req.body;

  UserModel.findByIdAndUpdate(
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

// REMOVE user by given Id
router.delete('/:id', (req, res) => {
  UserModel.findByIdAndRemove(
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

// INSERT ticket by given Id user
router.put('/:id', (req, res) => {
  const newTicket = {
    _id: new Id(),
    eventName: req.body.eventName,
    local: req.body.local,
    date: req.body.date,
    usdPrice: req.body.usdPrice,
  };

  UserModel.findByIdAndUpdate(
    req.params.id, {
      $push: {
        tickets: newTicket,
      },
    }, {
      new: true,
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(user);
    },
  );
});

module.exports = router;
