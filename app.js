const express = require('express');
const login = require('./lib/router/login');
const bodyParser = require('body-parser');
const configs = require('./configs/configs');

const server = function() {
    const app = express();
    const port = configs.port || 3000;

    app.use(bodyParser.json());
    app.use('/sso', login);

    app.listen(port, (err)=>{
        console.log('Server has started on port',port)
    })
}

process.on('unhandledRejection', (err)=>{
    console.log('Something went wrong!', err)
})

server();

