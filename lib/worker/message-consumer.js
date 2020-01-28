const BaseMessageQueue = require('./../utils/base-message-queue');
class MessageConsumer extends BaseMessageQueue {

    processMessage (msg) {
        console.log(msg.content.toString());
    }

    async start() {
        await this.bindQueueToExchange('logs.queue', 'logs.exchange');
        console.log('Message Queue Started')
    }
}

module.exports = MessageConsumer;