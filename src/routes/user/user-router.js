const express = require('express');
const bodyParser = require('body-parser');
const { signup, login, updatePassword } = require('./user-Controller');


const userRouter = express.Router();

userRouter.use(bodyParser.json());


userRouter.post('/signup', signup);


userRouter.post('/login', login);


userRouter.post('/update-password', updatePassword);

module.exports = userRouter;
