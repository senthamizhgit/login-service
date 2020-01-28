const BaseMessageQueue = require('./../utils/base-message-queue');
class MessageProducer extends BaseMessageQueue {
    async sendMessage(exchange, message) {
        try {
        let channel = await this.getChannel();
            channel.publish(exchange, '', new Buffer(message));
            return channel.close();
          } catch (error) {
            throw error;
          }
    
      }
}

module.exports = MessageProducer;