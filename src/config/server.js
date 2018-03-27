const express = require('express');
const routes = require('./routes');
const ticketsHandle = require('./ticket-routes');
const bodyParser = require('body-parser');

const server = express();
const port = 8000;

server.use(bodyParser.urlencoded({
  extended: true,
}));
server.use(bodyParser.json());
server.use('/api/v1/user', routes);
server.use('/api/v1/ticket', ticketsHandle);

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
