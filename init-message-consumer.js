const MessageConsumer = require('./lib/worker/message-consumer');

const mc = new MessageConsumer();

mc.start();