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
    (err, tickets) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(tickets);
    },
  );
});

router.get('/:id', (req, res) => {
  Database.find(
    {
      'tickets._id': Id(req.params.id),
    },
    (err, ticket) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(ticket);
    },
  );
});


// UPDATE a ticket in mongoDB is not so trivial how it seems. Because it's into an embed array. 
// if you sends a PUT verb without some field, then the ticket will be without the field at the end.
// Require a solution more elegant.
router.put('/:id', (req, res) => {
  const tickets = {};
  if (req.body.eventName) tickets.eventName = req.body.eventName;
  if (req.body.local) tickets.local = req.body.local;
  if (req.body.date) tickets.date = req.body.date;
  if (req.body.usdPrice) tickets.usdPrice = req.body.usdPrice;

  Database.updateOne(
    { 'tickets._id': Id(req.params.id) },
    dotNotation.flatten(tickets), {
      new: true,
    },
    (err, ticket) => {
      if (err) return res.status(500).send(err);
      return res.send(ticket);
    },
  );
});

router.delete('/:id', (req, res) => {

  Database.findOneAndUpdate(
    { 'tickets._id': Id(req.params.id) },{
      $pull: {
        tickets: {
          _id: Id(req.params.id)
        }
      }
    },{
      new: true
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send('Ticket not found');

      const response = {
        message: 'Successfully deleted',
        userNow: user,
      };
      return res.status(200).send(response);
    },
  );
});
module.exports = router;
