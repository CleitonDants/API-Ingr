const express = require('express');
const router = express.Router();
const database = require('./database');

router.get('/', function (req, res) {
    database.find(
        function (err, users) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(users);
        }
    );
});

router.get('/user/:id', function (req, res) {
    database.findById(
        req.params.id,
        function (err, user) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        }
    )
})

router.post('/user', function (req, res) {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        tickets: req.body.tickets
    };

    const userModeled = new database(newUser);
    userModeled.save(
        function (err) {
            if (err) return res.status(500).send(err);
            return res.status(200).send(userModeled);
        }
    );
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