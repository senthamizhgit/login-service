const connection = require('./../utils/rabbit-message-queue');
class MessageProducer {
    constructor() {
        this.con = null;
        this.channel = null;
    }

    async start() {
        try {
            this.con = await connection();
            if(this.con)  {
                console.log('Message Query Started');
            }
        } catch(e){
            console.log(e)
        }  
    }

    async sendMessage(exchange, msg) {
        try {
            this.channel = await this.con.createChannel();
            await this.channel.assertExchange(exchange, 'fanout', {durable: true});
            await this.channel.publish(exchange, '', new Buffer(msg));
            console.log('Message has been sent!')
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = MessageProducer;