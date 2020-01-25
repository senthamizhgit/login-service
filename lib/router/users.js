const express = require('express');
const UsersService = require('./../services/users-service');

const userRouter = express.Router();
const usersService = new UsersService();

async function addUser(req, res) {
    try {
        let result = await usersService.addUser(req.body)
        res.send(result)
    } catch(err) {
        const code = err.code || 500;
        res.status(code).send(err)
    }
}

userRouter.use(function(req, res, next) {
    console.log(`Time : ${Date.now()}`);
    next();
});

userRouter.post('/addUser',addUser);


module.exports = userRouter;