const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
    response.send();
})

const Login = require('../controller/login');
const User = require('../controller/user');
const Auth = require('../helpers/validateJwt');

app.post('/login', Login.login);

app.post('/users', User.create);
app.get('/users', User.findAll);
app.get('users',Auth, User.findById);
app.delete('/users/:id', Auth, User.del);

module.exports = app;