const express = require('express');
const userModel = require('../models/user');
const mongoose = require('mongoose');
const { ticketsHandler } = require('./utils');

const router = express.Router();
const { ObjectId: Id } = mongoose.Types;

//GET all users
router.get('/', (req, res) => {
  userModel.find((err, users) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(users);
  });
});

//GET user by id
router.get('/:id', (req, res) => {
  userModel.findById(
    req.params.id,
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(user);
    },
  );
});

//INSERT user
router.post('/', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    tickets: ticketsHandler(req.body.tickets),
  };

  const userModeled = new userModel(newUser);

  userModeled.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(userModeled);
  });
});

//UPDATE user by given Id
router.put('/:id', (req, res) => {
  const query = req.params.id;
  const newData = req.body;

  userModel.findByIdAndUpdate(
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

//REMOVE user by given Id
router.delete('/:id', (req, res) => {
  userModel.findByIdAndRemove(
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

module.exports = router;
