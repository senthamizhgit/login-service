const mongoose = require('mongoose');
const validator = require('validator');

module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: function(value) {
            if(!validator.isEmail(value)) {
                throw new Error(`Email is in valid - ${value}`)
            }
        }
    }
},{strict: true})