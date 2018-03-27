const express = require('express');
const router = express.Router();
const database = require('./database');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;


router.get('/', function (req, res) {
    database.find({}, {
            tickets: 1
        },
        function (err, users) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(users);
        })
});

router.get('/:id', function (req, res) {
    database.find({
            "tickets._id": req.params.id
        },
        function (err, user) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        }
    )
})

router.put('/:id', function (req, res) {

    const newTicket = {
        _id: new ObjectId(),
        eventName: req.body.eventName,
        local: req.body.local,
        date: req.body.date,
        usdPrice: req.body.usdPrice
    };

    database.findByIdAndUpdate(
        req.params.id, {
            $push: {
                tickets: newTicket
            }
        }, {
            new: true
        },
        function (err, user) {
            if (err) return res.status(500).send(err);
            return res.send(user);
        }
    );

});

module.exports = router;