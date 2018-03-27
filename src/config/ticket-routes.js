const express = require('express');
const Database = require('./Database');
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
      'tickets._id': req.params.id,
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
