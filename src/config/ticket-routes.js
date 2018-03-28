const express = require('express');
const Database = require('./database');
const mongoose = require('mongoose');

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
      'tickets._id': Id(req.params.id)
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(user);
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

  Database.findOneAndUpdate(
    { 'tickets._id': Id(req.params.id) },
    { 'tickets.$': newTicket }, {
      new: true,
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.send(user);
    },
  );
});
module.exports = router;
