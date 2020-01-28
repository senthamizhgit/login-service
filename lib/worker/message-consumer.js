const connection = require('./../utils/rabbit-message-queue');
class MessageConsumer {
    constructor() {
        this.con = null;
        this.channel = null;
    }

    async start() {
        try {
            this.con = await connection();
            if(this.con)  {
                console.log('Message Consumer Started');
            }
        } catch(e){
            console.log(e)
        }  
    }

    async consumeMessage(exchange) {
        try {
            this.channel = await this.con.createChannel();
            await this.channel.assertExchange(exchange, 'fanout', {durable: true});
            let q = await this.channel.assertQueue('',{exclusive: true});
            await this.channel.bindQueue(q.queue, exchange, '');
            let msg = await this.channel.consume(q.queue);
            console.log('Message has been received!');
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = MessageConsumer;