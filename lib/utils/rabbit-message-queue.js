const amqp = require('amqplib');
const configs = require('./../../configs/configs');

let rabbitmq = async function() {
    return await amqp.connect(configs.rabbitmq.connection);
}

module.exports = rabbitmq;