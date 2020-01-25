const jwt = require('jsonwebtoken');
const configs = require('./../../configs/configs');
const UserService = require('./users-service');

class LoginService {

    constructor() {
        this.userService = new UserService();
    }

    async generateToken(requestPayload) {
        try {
                let payload = requestPayload.body;
                const validUser = await this.userService.validateCredentials(payload)
                if(validUser){
                    let token = jwt.sign({validUser},configs.jwtSecret,{expiresIn: '1h'});
                    return {
                        success: true,
                        token: token,
                        message: 'Authentication Successful'
                    }
                } else {
                    throw {
                        success: false,
                        message: 'Authentication Failed'
                    }
                }
        } catch(err) {
            throw this._handleError(err);
        }
        
    }

    checkToken(requestPayload) {
        let token = requestPayload.headers['x-access-token'] || requestPayload.headers['authorization'] || '';
        let response;
        if(token.startsWith('Bearer')) {
            token = token.slice(7,token.length)
        }
        if(token) {
            jwt.verify(token,configs.jwtSecret,(err, auth)=> {
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

    _handleError(err) {
        return {
            success: false,
            code: 500,
            message: err.message
        }
    }

}

module.exports = LoginService;