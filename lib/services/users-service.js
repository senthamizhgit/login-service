const UserModel = require('./../db/model/Users');
class UsersService {
    constructor() {
        this.userModel = new UserModel();
    }

    async addUser(userPayload) {
        try {
            let responsePayload = {};
            let res = await this.userModel.addUser(userPayload);
            responsePayload.success = true;
            responsePayload.id = res._id;
            responsePayload.message = 'User has been added successfully';
            return responsePayload;
        } catch(err) {
            throw this._handleError(err);
        }
        
    }

    async validateCredentials(userPayload) {
        try{
            let username = userPayload.username;
            let password = userPayload.password;
            let responsePayload = {};
            if(username && password) {
                let res = await this.userModel.validateCredentials(username,password);
                if(res) {
                    responsePayload.success = true;
                    responsePayload.message = res;
                    return responsePayload;
                }
                throw {
                    success: false,
                    message: 'User Not Found'
                }
            } else {
                throw {success: false}
            }
            
        }catch(err){
            throw this._handleError(err)
        }
    }

    _handleError(err) {
        const name = err.name;
        if(name == 'ValidationError') {
            return {
                code: 400,
                success: false,
                message: err.message
            }
        } else {
            return {
                code: 500,
                success: false,
                message: err.message
            }
        }
    }
}

module.exports = UsersService;