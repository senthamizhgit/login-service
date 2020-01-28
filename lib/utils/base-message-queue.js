const amqp = require('amqplib');
const configs = require('../../configs/configs');

class BaseMessageQueue {
    constructor() {
        this.connction = null;
    }

    async createConnection() {
        this.connction = await amqp.connect(configs.rabbitmq.connection);
        this.connction.on('close', (e)=>{
            console.log('Connection Closed')
        });
        this.connction.on('error', (e)=>{
            console.log('Message Queue Error')
        })
    }

    async closeConnection() {
        try {
            if(this.connction) { await this.connction.close() }
        } catch(e) {
            throw e;
        }
    }

    async getChannel() {
        try {
            if(!this.connction) {
                await this.createConnection();
            }
            let channel = await this.connction.createChannel();
            return channel;
        } catch(e) {
            throw e;
        }
    }

    async createExchange(exchange, type, channel, arg) {
        await channel.assertExchange(exchange,type,arg);
    }

    async createQueue(queue, channel, arg) {
        await channel.assertQueue(queueName, {
            arguments: args
          })
    }

    _setPrefetch(channel) {
        channel.prefetch(1);
    }

    processMessage(queue, exchange, channel) {
        this.errorv2('BaseMessenger', 'processMessage', 'Method Not Implemented', queue, exchange, channel)
    }

    async bindQueueToExchange(queue, exchange) {
        try {
            let channel = await this.getChannel();
            this._setPrefetch(channel);
            let q;
            q = queue;
            await channel.bindQueue(q, exchange, '');
            await channel.consume(q, (msg)=>{
                console.log(msg.content.toString())
            });
        } catch(e) {
            throw e;
        }
    }
}

module.exports = BaseMessageQueue;