const mongoose = require('mongoose');
const usersSchema = require('./../schema/users-schema');

class UsersModel {
    constructor() {
        this.Users = mongoose.model('Users', usersSchema);
    }

    async addUser(data) {
        try {
            let user = new this.Users(data);
            return await user.save();
            
        } catch(err) {
            throw err;
        }   
    }

    async validateCredentials(username, password) {
        try {
            let user = await this.Users.findOne({username: username, password: password});
            return user;
        } catch(err) {
            throw err;
        }
    }

}

module.exports = UsersModel;