const express = require('express');
const login = require('./lib/router/login');
const users = require('./lib/router/users');
const bodyParser = require('body-parser');
const configs = require('./configs/configs');
const mongoose = require('mongoose');
const logger = require('./lib/utils/logger');

class Server {
    constructor() {
        this.app = express();
        this.port = configs.port || 3000;
        this.logme = logger.getLogger();
    }

    appConfig() {
        this.app.use(bodyParser.json());
        this.app.use('/sso', login);
        this.app.use('/users', users);
    }

    connectDB() {
        mongoose.connect(configs.mongodb.connection, configs.mongodb.options, (err)=> {
            if(err) {
                this.logme.error(err);
            } else {
                this.logme.info('DB Connected');
            }
        });
        mongoose.set('useCreateIndex', true);
    }

    startServer() {
        this.appConfig();
        this.app.listen(this.port, (err)=>{
            this.logme.info('Server has started');
        })
        this.connectDB();
    }
}

module.exports = Server;

