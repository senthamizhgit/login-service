const express = require('express');
const joi = require('joi');
const requestSchema = require('./../schema/request-schema');
const loginService = require('./../services/login-service');

const router = express.Router();

router.use(function(req, res, next) {
    console.log(`Time : ${Date.now()}`);
    next();
});

router.get('/',(req, res) => {
    res.send('Hello From Router')
});

router.post('/login', (req, res) => {
    joi.validate(req.body, requestSchema.loginRequestSchema, (err) => {
        if(err) {
            res.status(422).json({
                status: 'Error',
                message: 'Invalid Schema'
            })
        } else  {
            let login_service = new loginService();
            res.send(login_service.checkToken(req));
        }
    })
});

router.post('/logout', (req, res) => {
    res.json({
        status: 'success',
        data: req.body
    });
})

module.exports = router;