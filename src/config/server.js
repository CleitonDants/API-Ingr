const express = require('express');
const server = express();
const port = 8000;
const routes = require('./routes');
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use('/api', routes);

server.listen(port,
    () => console.log(`Listening on port ${port}`));

module.exports = server;