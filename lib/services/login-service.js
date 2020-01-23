const jwt = require('jsonwebtoken');
const configs = require('./../../configs/configs');

class LoginService {

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