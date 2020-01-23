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
        if(token.startsWith('Bearer')) {
            token = token.slice(7,token.length)
        }
        if(token) {
            jwt.verify(token,configs.login.jwtSecret,(err, jwt)=> {
                if(err) {
                    return {
                        success: false,
                        message: 'Auth token is not valid!'
                    }
                } else {
                    return {
                        success: true,
                        token: jwt
                    }
                }
            })
        } else {
            return {
                success: false,
                message: 'Missing auth token!'
            }
        }
    }

}

module.exports = LoginService;