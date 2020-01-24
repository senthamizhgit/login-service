const express = require('express');
const login = require('./lib/router/login');
const bodyParser = require('body-parser');
const configs = require('./configs/configs');

class Server {
    constructor() {
        this.app = express();
        this.port = configs.port || 3000;
    }

    appConfig() {
        this.app.use(bodyParser.json());
        this.app.use('/sso', login);
    }

    startServer() {
        this.app.listen(this.port, (err)=>{
            console.log('Server has started on port',this.port)
        })
    }
}

module.exports = Server;

