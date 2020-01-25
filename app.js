const express = require('express');
const login = require('./lib/router/login');
const users = require('./lib/router/users');
const bodyParser = require('body-parser');
const configs = require('./configs/configs');
const mongoose = require('mongoose');

class Server {
    constructor() {
        this.app = express();
        this.port = configs.port || 3000;
    }

    appConfig() {
        this.app.use(bodyParser.json());
        this.app.use('/sso', login);
        this.app.use('/users', users);
    }

    connectDB() {
        mongoose.connect(configs.mongodb.connection, configs.mongodb.options, (err)=> {
            if(err) {
                console.log(err);
            } else {
                console.log('DB Connected')
            }
        })
    }

    startServer() {
        this.appConfig();
        this.app.listen(this.port, (err)=>{
            console.log('Server has started on port',this.port)
        })
        this.connectDB();
    }
}

module.exports = Server;

