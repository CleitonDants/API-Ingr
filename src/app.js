const express = require('express');
const userRouter = require('./routes/user-routes');
const ticketRouter = require('./routes/ticket-routes');
const bodyParser = require('body-parser');
const cors = require('./config/cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ingr');

const server = express();
const port = process.env.PORT || 7000;

server.use(bodyParser.urlencoded({
  extended: true,
}));
server.use(bodyParser.json());
server.use(cors);

server.get('/api/v1/', (req, res) => res.send('Welcome to the Ingr API! We recommend starts at /user to get all users. :)'));

server.use('/api/v1/user', userRouter);
server.use('/api/v1/ticket', ticketRouter);

// Conditional for the server doesn't staying on all the time when the tests are running
if (require.main === module) server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
