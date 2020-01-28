const MessageProducer = require('./lib/worker/message-producer');

const mp = new MessageProducer();

(async function(){
await mp.start();
await mp.sendMessage('logs', 'this is my first log');
})();