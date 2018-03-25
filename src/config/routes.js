const express = require('express');
const router = express.Router();
const database = require('./database');

router.get('/', function (req, res) {
    database.find()
        .then(function (doc) {
            res.send(doc);
        });
});

router.post('/user', function (req, res) {
    const newUser = {
        name: req.body.name,
        email: req.body.email
    };

    const data = new database(newUser);
    data.save();
})

router.put('/user/:id', function (req, res) {
    const query = req.params.id;
    const newData = req.body;

    database.findByIdAndUpdate(
        query,
        newData, {
            new: true
        },
        function (err, user) {
            if (err) return res.status(500).send(err);
            return res.send(user);
        }
    );

});

router.delete('/user/:id', function (req, res) {
    database.findByIdAndRemove(
        req.params.id,
        function (err, user) {
            if (err) return res.status(500).send(err);

            const response = {
                message: 'Successfully deleted',
                user: user
            }
            return res.status(200).send(response);
        }
    );
});
module.exports = router;