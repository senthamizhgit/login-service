const mongoose = require('mongoose');
const configs = require('./../../configs/configs');

mongoose.connect(configs.mongodb.connection, configs.mongodb.options, (err)=> {
    if(err) {
        console.log(err);
    } else {
        console.log('DB Connected')
    }

})