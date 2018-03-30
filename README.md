## API-Ingr
An API RESTFul that serves **users data and tickets** bought by them.

## Code style
 [![js-airbnb-style](https://camo.githubusercontent.com/9829cb01a7f7b1bc7ad5e52f5c5451cd97983189/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d416972626e622d6666356135662e737667)](https://github.com/airbnb/javascript)
 
Using Airbnb style code.
 
## Tech/framework used

<b>Built with:</b>
- Node.js
- Express
- Body-parser
- MongoDB
- Mongoose

<b>Test:</b>
- Tape
- Supertest
- Tap Spec

<b>Style:</b>
- ESLint

<b>DevTool</b>
- Nodemon

<b>Util</b>
- Mongo-Dot-Notation
## Features
- GET all data users
- POST user
- GET, PUT and DELETE user by ID
- POST tickets to an user
- GET, PUT and DELETE ticket by ID

## Installation
Required NPM version 5.6.0. NPM has some unexpected bugs with the lastest versions. 

````
    npm install
    npm run ingr
````

To develop (init nodemon):
````
  npm install
  npm run dev
````

## API Reference
#### By [Postman](https://www.getpostman.com/):
The port may variate.
#### USERS `` api/v1/user/``
##### [GET] All Users:
``http://localhost:7000/api/v1/user/``
##### [GET] Get an user by id:
``http://localhost:7000/api/v1/user/:id``
##### [POST] An user:

``http://localhost:7000/api/v1/user/``

###### Insertion format:
All fields are **required** excepts "tickets".
````
{
  "name": <string>,
  "email": <string>,
  "age": <int>,
  "tickets": <Array>
}
````
##### [PUT] Update one or more fields by an user Id

``http://localhost:7000/api/v1/user/:id``

Example:
```
{
	"name": "Elon Musk",
    "age": 46,
    "email": "elon@tesla.com"
}
```
##### [DELETE] By an user id
``http://localhost:7000/api/v1/user/:id``

##### [PUT] Insert a ticket by given user Id:

``http://localhost:7000/api/v1/ticket/:id``

###### Insertion format:
````
{
  "eventName": <string>,
  "local": <string>,
  "date": <string>,
  "price": <float>
}
````

#### TICKETS ``api/v1/ticket/``

##### [GET] All tickets:
``http://localhost:7000/api/v1/ticket/``
##### [GET] Get a ticket by id:
``http://localhost:7000/api/v1/user/ticket/:id``

##### [DELETE] By a ticket id:
``http://localhost:7000/api/v1/ticket/:id``

## Tests
Tests by the frameworks Tape and Supertest 
```
npm run test
```
## Improvements required
- Implement an scheme in "tickets" instead an array of tickets;
- Refactor ticket update method;
- More unit tests of user;
- Unit tests for tickets;
- More validations;
- Switch type of "date" from String to Date.

## License
No restrictions.

© [Cleiton Dantas](https://github.com/cleitondants)