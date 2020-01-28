const MessageProducer = require('./lib/worker/message-producer');

const mp = new MessageProducer();


mp.sendMessage('logs.exchange', 'hello');
