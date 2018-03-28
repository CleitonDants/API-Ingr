const express = require('express');
const Database = require('./database');
const mongoose = require('mongoose');
const dotNotation = require('mongo-dot-notation');

const router = express.Router();

const { ObjectId: Id } = mongoose.Types;

router.get('/', (req, res) => {
  Database.find(
    {}, {
      tickets: 1,
    },
    (err, users) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(users);
    },
  );
});

router.get('/:id', (req, res) => {
  Database.find(
    {
      'tickets._id': Id(req.params.id),
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(user);
    },
  );
});

router.put('/:id', (req, res) => {
  const instructions = dotNotation.flatten({ tickets: dotNotation.$set(req.body) });

  Database.findOneAndUpdate(
    { 'tickets._id': Id(req.params.id) },
    instructions, {
      new: true,
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.send(user);
    },
  );
});
module.exports = router;
