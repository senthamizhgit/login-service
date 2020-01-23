const jwt = require('jsonwebtoken');
const configs = require('./../../configs/configs');

class LoginService {

    generateToken(requestPayload) {
        let username = requestPayload.body['username'];
        let password = requestPayload.body['password'];

        if(username && password) {
            if((username == 'admin' && password=='admin')){
                let token = jwt.sign({username},configs.login.jwtSecret,{expiresIn: '24h'});
                return {
                    success: true,
                    token: token,
                    message: 'Authentication Successful'
                }
            } else {
                return {
                    success: false,
                    message: 'Authentication Failed'
                }
            }
        } else {
            return {
                success: false,
                message: 'Missing Information'
            }
        }
    }

    checkToken(requestPayload) {
        let token = requestPayload.headers['x-access-token'] || requestPayload.headers['authorization'] || '';
        let response;
        if(token.startsWith('Bearer')) {
            token = token.slice(7,token.length)
        }
        if(token) {
            jwt.verify(token,configs.login.jwtSecret,(err, auth)=> {
                if(err) {
                    response = {
                        success: false,
                        message: 'Auth token is not valid!'
                    }
                } else {
                    response = {
                        success: true,
                        auth: auth
                    }
                }
            })
        } else {
            response = {
                success: false,
                message: 'Missing auth token!'
            }
        }
        console.log(response)
        return response;
    }

}

module.exports = LoginService;