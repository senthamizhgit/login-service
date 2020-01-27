const amqp = require('amqplib/callback_api');
const configs = require('./../../configs/configs');

amqp.connect(configs.rabbitmq.connection,(err, con)=>{
    if(err) {
        console.log('Error')
    } else {
        console.log('Rabbit MQ Connected')
    }
})