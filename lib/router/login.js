const express = require('express');
const joi = require('joi');
const requestSchema = require('./../schema/request-schema');
const loginService = require('./../services/login-service');
const logger = require('./../utils/logger');


const router = express.Router();
const login = new loginService();
const logme = logger.getLogger();

router.use(function(req, res, next) {
    console.log(`Time : ${Date.now()}`);
    next();
});

router.get('/',(req, res) => {
    res.send('Hello From Router')
});

router.post('/login', async (req, res) => {
    try {
        logme.info('Login Router Called')
        let response = joi.validate(req.body, requestSchema.loginRequestSchema);
        if(response.error) {
            logme.error('Login Error',response.error)
            res.status(422).json({
                status: 'Error',
                message: 'Invalid Schema'
            })
        } else  {
            let result = await login.generateToken(req);
            if(result.success) {
                logme.info('Login Success', result)
                res.status(200).send(result);
            } else {
                logme.error('Login Error', result)
                res.status(401).send(result);
            }
            
        }
    } catch(err) {
        logme.error('Login Error', err)
        res.status(500).send(err);
    }
    
});

router.post('/logout', (req, res) => {
    res.json({
        status: 'success',
        data: req.body
    });
})

router.post('/verify-auth',(req, res)=>{
    let result = login.checkToken(req);
    if(result.success) {
        res.status(200).send(result);
    } else {
        res.status(401).send(result);
    }
})

module.exports = router;