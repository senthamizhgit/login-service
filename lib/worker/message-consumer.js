const BaseMessageQueue = require('./../utils/base-message-queue');
class MessageConsumer extends BaseMessageQueue {

    processMessage (queue, exchange, channel) {
        console.log(queue, exchange, channel);
    }

    async start() {
        await this.bindQueueToExchange('logs', 'logs');
        console.log('Message Queue Started')
    }
}

module.exports = MessageConsumer;