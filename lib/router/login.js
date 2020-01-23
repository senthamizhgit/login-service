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
            let result = login_service.generateToken(req);
            res.send(result)
        }
    })
});

router.post('/logout', (req, res) => {
    res.json({
        status: 'success',
        data: req.body
    });
})

router.post('/verify-auth',(req, res)=>{
    let login_service = new loginService();
    let result = login_service.checkToken(req);
    res.send(result)
})

module.exports = router;